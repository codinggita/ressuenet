const Volunteer = require('../models/Volunteer');
const { cloudinary, isConfigured } = require('../config/cloudinary');

async function uploadToCloudinary(fileBuffer, folder, prefix) {
  if (!isConfigured) {
    return null;
  }

  const dataUri = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: `${prefix}-${Date.now()}`,
  });

  return result.secure_url;
}

async function registerVolunteer(req, res) {
  let profilePhotoUrl = null;
  let idDocumentUrl = null;

  if (Array.isArray(req.files?.profilePhoto) && req.files.profilePhoto[0]) {
    profilePhotoUrl = await uploadToCloudinary(
      req.files.profilePhoto[0].buffer,
      'rescuenet/volunteers',
      'profile'
    );
  }

  if (Array.isArray(req.files?.idDocument) && req.files.idDocument[0]) {
    idDocumentUrl = await uploadToCloudinary(
      req.files.idDocument[0].buffer,
      'rescuenet/volunteers',
      'document'
    );
  }

  const volunteer = await Volunteer.create({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills ? [].concat(req.body.skills) : [],
    availability: req.body.availability ? [].concat(req.body.availability) : [],
    certifications: req.body.certifications,
    emergencyContact: {
      name: req.body.emergencyContactName,
      phone: req.body.emergencyContactPhone,
    },
    preferredSpecies: req.body.preferredSpecies ? [].concat(req.body.preferredSpecies) : [],
    preferredTasks: req.body.preferredTasks ? [].concat(req.body.preferredTasks) : [],
    travelRadius: req.body.travelRadius,
    notifications: {
      email: req.body.notifyEmail !== 'false',
      push: req.body.notifyPush !== 'false',
    },
    profilePhotoUrl,
    idDocumentUrl,
  });

  return res.status(201).json({ success: true, data: volunteer });
}

async function getVolunteerOpportunities(req, res) {
  return res.json({
    success: true,
    data: [
      { id: 'rescue', title: 'Emergency Rescue', mode: 'Field', urgency: 'High' },
      { id: 'foster', title: 'Foster Care', mode: 'Home', urgency: 'Medium' },
      { id: 'transport', title: 'Transport Support', mode: 'Mobile', urgency: 'High' },
      { id: 'advocacy', title: 'Digital Advocacy', mode: 'Remote', urgency: 'Low' },
    ],
  });
}

async function updateVolunteer(req, res) {
  const volunteer = await Volunteer.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!volunteer) {
    return res.status(404).json({ success: false, message: 'Volunteer profile not found.' });
  }

  return res.json({ success: true, data: volunteer });
}

module.exports = { registerVolunteer, getVolunteerOpportunities, updateVolunteer };
