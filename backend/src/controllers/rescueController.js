const RescueService = require('../models/RescueService');
const RescueReport = require('../models/RescueReport');
const Pet = require('../models/Pet');
const Story = require('../models/Story');
const Article = require('../models/Article');
const Donation = require('../models/Donation');
const {
  calculateDistance,
  geocodeAddress,
  inferCoordinatesFromText,
} = require('../utils/geocoding');
const { cloudinary, isConfigured } = require('../config/cloudinary');
const {
  stateHelplines,
  governmentSchemes,
  wildlifeSanctuaries,
  speciesSpotlight,
  legalResources,
  officialResources,
  conservationTimeline,
  rescueStories,
  newsBriefings,
  wildlifeCrimeCases,
} = require('../data/realPlatformData');

async function getNearbyRescues(req, res) {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radius = Number(req.query.radius) || 10000;

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ success: false, message: 'Valid lat and lng query params are required.' });
  }

  const query = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        $maxDistance: radius,
      },
    },
  };

  if (req.query.type) {
    query.type = req.query.type;
  }

  const rescues = await RescueService.find(query).limit(50);
  const data = rescues.map((item) => ({
    ...item.toObject(),
    distanceKm: Number(
      calculateDistance(lat, lng, item.location.coordinates[1], item.location.coordinates[0]).toFixed(1)
    ),
  }));

  return res.json({ success: true, count: data.length, data });
}

async function searchRescues(req, res) {
  const query = {};

  if (req.query.city) {
    query['location.city'] = new RegExp(req.query.city, 'i');
  }

  if (req.query.state) {
    query['location.state'] = new RegExp(req.query.state, 'i');
  }

  if (req.query.term) {
    query.$or = [
      { name: new RegExp(req.query.term, 'i') },
      { services: new RegExp(req.query.term, 'i') },
    ];
  }

  const results = await RescueService.find(query).limit(50);
  return res.json({ success: true, count: results.length, data: results });
}

async function getEmergencyRescues(req, res) {
  const data = await RescueService.find({
    $or: [{ 'operatingHours.is24x7': true }, { services: 'Emergency Rescue' }],
  }).limit(30);

  return res.json({ success: true, count: data.length, data });
}

async function getRescueById(req, res) {
  const rescue = await RescueService.findById(req.params.id);

  if (!rescue) {
    return res.status(404).json({ success: false, message: 'Rescue center not found.' });
  }

  return res.json({ success: true, data: rescue });
}

async function uploadBufferToCloudinary(fileBuffer, filename) {
  if (!isConfigured) {
    return null;
  }

  const base64 = fileBuffer.toString('base64');
  const dataUri = `data:image/jpeg;base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'rescuenet/reports',
    public_id: filename,
  });

  return result.secure_url;
}

async function reportAnimal(req, res) {
  let coordinates = null;

  if (req.body.lat && req.body.lng) {
    coordinates = { lat: Number(req.body.lat), lng: Number(req.body.lng) };
  } else if (req.body.location) {
    try {
      coordinates = await geocodeAddress(req.body.location);
    } catch (error) {
      coordinates = inferCoordinatesFromText(req.body.location);
    }
  }

  let photoUrl = null;
  if (req.file) {
    photoUrl = await uploadBufferToCloudinary(req.file.buffer, `report-${Date.now()}`);
  }

  const referenceId = `RP-${Date.now().toString().slice(-6)}`;

  let assignedCenter = null;
  if (coordinates) {
    assignedCenter = await RescueService.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [coordinates.lng, coordinates.lat],
          },
          $maxDistance: 25000,
        },
      },
    });
  }

  const report = await RescueReport.create({
    referenceId,
    locationText: req.body.location,
    location: coordinates || undefined,
    species: req.body.species,
    severity: Number(req.body.severity) || 3,
    urgency: Number(req.body.severity) >= 4 ? 'High' : Number(req.body.severity) >= 3 ? 'Medium' : 'Low',
    description: req.body.description,
    isAnonymous: req.body.isAnonymous === 'true' || req.body.isAnonymous === true,
    reporterName: req.body.reporterName,
    reporterPhone: req.body.reporterPhone,
    photoUrl,
    assignedCenter: assignedCenter?._id,
  });

  return res.status(201).json({
    success: true,
    message: 'Rescue report submitted.',
    data: {
      report,
      assignedCenter,
      etaMinutes: assignedCenter ? 10 : 20,
    },
  });
}

async function getLiveDashboard(req, res) {
  const [activeAlerts, resolvedToday, activeCenters] = await Promise.all([
    RescueReport.countDocuments({ status: { $in: ['Open', 'Dispatched'] } }),
    RescueReport.countDocuments({
      status: 'Resolved',
      updatedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    }),
    RescueService.countDocuments(),
  ]);

  const recentReports = await RescueReport.find().sort({ createdAt: -1 }).limit(10);

  return res.json({
    success: true,
    data: {
      activeAlerts,
      resolvedToday,
      activeCenters,
      averageResponseMinutes: 14,
      recentReports,
    },
  });
}

async function getPlatformOverview(req, res) {
  const [
    activeAlerts,
    activeCenters,
    availablePets,
    totalStories,
    totalArticles,
    statesCovered,
    recentReports,
  ] = await Promise.all([
    RescueReport.countDocuments({ status: { $in: ['Open', 'Dispatched'] } }),
    RescueService.countDocuments(),
    Pet.countDocuments({ adoptionStatus: 'Available' }),
    Story.countDocuments(),
    Article.countDocuments(),
    RescueService.distinct('location.state'),
    RescueReport.find().sort({ createdAt: -1 }).limit(5).select('referenceId locationText species urgency status createdAt'),
  ]);

  return res.json({
    success: true,
    data: {
      stats: {
        activeAlerts,
        activeCenters,
        availablePets,
        totalStories,
        totalArticles,
        statesCovered: statesCovered.length,
      },
      helplines: stateHelplines,
      schemes: governmentSchemes,
      sanctuaries: wildlifeSanctuaries,
      species: speciesSpotlight,
      legalResources,
      officialResources,
      timeline: conservationTimeline,
      rescueStories,
      newsBriefings,
      wildlifeCrimeCases,
      recentReports,
    },
  });
}

async function getCompleteDashboard(req, res) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    activeAlerts,
    resolvedToday,
    activeCenters,
    recentReports,
    stateCoverage,
    recentDonations,
    availablePets,
    highlightedPets,
  ] = await Promise.all([
    RescueReport.countDocuments({ status: { $in: ['Open', 'Dispatched'] } }),
    RescueReport.countDocuments({ status: 'Resolved', updatedAt: { $gte: todayStart } }),
    RescueService.countDocuments(),
    RescueReport.find().sort({ createdAt: -1 }).limit(8),
    RescueService.aggregate([
      { $group: { _id: '$location.state', centers: { $sum: 1 }, rescues: { $sum: '$totalRescues' } } },
      { $sort: { centers: -1, rescues: -1 } },
      { $limit: 6 },
    ]),
    Donation.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, totalRaised: { $sum: '$amount' }, donors: { $sum: 1 } } },
    ]),
    Pet.countDocuments({ adoptionStatus: 'Available' }),
    Pet.find({ adoptionStatus: 'Available' })
      .populate('shelter', 'name location.city')
      .sort({ urgencyLevel: -1, createdAt: -1 })
      .limit(4),
  ]);

  const totalRaised = recentDonations[0]?.totalRaised || 0;
  const successfulDonors = recentDonations[0]?.donors || 0;

  const alerts = recentReports.map((report) => ({
    id: report._id,
    referenceId: report.referenceId,
    location: report.locationText,
    species: report.species,
    urgency: report.urgency,
    status: report.status,
    createdAt: report.createdAt,
    description: report.description,
  }));

  const recommendedActions = [
    {
      title: 'Use verified helplines first for emergencies',
      detail: 'Direct people to state rescue lines or the nearest hospital before sharing general social posts.',
    },
    {
      title: 'Escalate wildlife crime separately from companion-animal rescue',
      detail: 'Point suspected trafficking or illegal possession cases to enforcement channels and WCCB contacts.',
    },
    {
      title: 'Keep adoption inventory fresh',
      detail: 'Profiles with shelter, vaccination status, and location are easier to act on than generic placeholders.',
    },
  ];

  return res.json({
    success: true,
    data: {
      activeAlerts,
      resolvedToday,
      activeCenters,
      availablePets,
      totalRaised,
      successfulDonors,
      todayAlerts: alerts,
      recentReports,
      networkByState: stateCoverage.map((item) => ({
        state: item._id,
        centers: item.centers,
        rescues: item.rescues,
      })),
      helplines: stateHelplines,
      schemes: governmentSchemes,
      sanctuaries: wildlifeSanctuaries,
      speciesSpotlight,
      legalResources,
      timeline: conservationTimeline,
      newsBriefings,
      wildlifeCrimeCases,
      adoptionHighlights: highlightedPets,
      recommendedActions,
      officialResources,
    },
  });
}

module.exports = {
  getNearbyRescues,
  searchRescues,
  getEmergencyRescues,
  getRescueById,
  reportAnimal,
  getLiveDashboard,
  getPlatformOverview,
  getCompleteDashboard,
};
