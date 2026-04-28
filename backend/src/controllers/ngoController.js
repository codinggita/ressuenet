const NGO = require('../models/NGO');

async function registerNGO(req, res) {
  const ngo = await NGO.create({
    name: req.body.name,
    contactPerson: req.body.contactPerson,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    description: req.body.description,
    services: req.body.services ? [].concat(req.body.services) : [],
    website: req.body.website,
  });

  return res.status(201).json({ success: true, data: ngo });
}

async function listNGOs(req, res) {
  const ngos = await NGO.find().sort({ verified: -1, createdAt: -1 });
  return res.json({ success: true, count: ngos.length, data: ngos });
}

async function updateNGO(req, res) {
  const ngo = await NGO.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!ngo) {
    return res.status(404).json({ success: false, message: 'NGO not found.' });
  }

  return res.json({ success: true, data: ngo });
}

module.exports = { registerNGO, listNGOs, updateNGO };
