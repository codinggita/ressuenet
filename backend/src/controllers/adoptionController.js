const Pet = require('../models/Pet');
const User = require('../models/User');
const AdoptionApplication = require('../models/AdoptionApplication');
const { buildPagination } = require('../utils/helpers');

async function getPets(req, res) {
  const filters = {};
  const { page, limit, skip } = buildPagination(req.query);

  if (req.query.species) {
    filters.species = req.query.species;
  }

  if (req.query.city) {
    filters.city = new RegExp(req.query.city, 'i');
  }

  if (req.query.status) {
    filters.adoptionStatus = req.query.status;
  }

  if (req.query.term) {
    filters.$or = [
      { name: new RegExp(req.query.term, 'i') },
      { breed: new RegExp(req.query.term, 'i') },
      { personality: new RegExp(req.query.term, 'i') },
    ];
  }

  const [pets, total] = await Promise.all([
    Pet.find(filters).populate('shelter', 'name location.city').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Pet.countDocuments(filters),
  ]);

  return res.json({
    success: true,
    pagination: { page, limit, total },
    data: pets,
  });
}

async function getPetById(req, res) {
  const pet = await Pet.findById(req.params.id).populate('shelter');

  if (!pet) {
    return res.status(404).json({ success: false, message: 'Pet not found.' });
  }

  await Pet.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  const similarPets = await Pet.find({
    _id: { $ne: pet._id },
    species: pet.species,
    adoptionStatus: 'Available',
  }).limit(3);

  return res.json({ success: true, data: { pet, similarPets } });
}

async function addFavorite(req, res) {
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: req.body.petId } });
  await Pet.findByIdAndUpdate(req.body.petId, { $addToSet: { favorites: req.user._id } });

  return res.json({ success: true, message: 'Pet added to favorites.' });
}

async function removeFavorite(req, res) {
  await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: req.params.id } });
  await Pet.findByIdAndUpdate(req.params.id, { $pull: { favorites: req.user._id } });

  return res.json({ success: true, message: 'Favorite removed.' });
}

async function getFavorites(req, res) {
  const user = await User.findById(req.user._id).populate('favorites');
  return res.json({ success: true, data: user.favorites });
}

async function submitApplication(req, res) {
  const application = await AdoptionApplication.create({
    pet: req.body.petId,
    user: req.user?._id,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    message: req.body.message,
  });

  return res.status(201).json({
    success: true,
    message: 'Adoption application submitted.',
    data: application,
  });
}

module.exports = {
  getPets,
  getPetById,
  addFavorite,
  removeFavorite,
  getFavorites,
  submitApplication,
};
