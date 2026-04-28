const express = require('express');

const RescueService = require('../models/RescueService');
const Pet = require('../models/Pet');
const Story = require('../models/Story');
const Article = require('../models/Article');
const Donation = require('../models/Donation');
const { geocodeAddress } = require('../utils/geocoding');
const { sendEmail } = require('../utils/email');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

router.get('/db', async (req, res) => {
  const [rescueCenters, pets, stories, articles, donations] = await Promise.all([
    RescueService.countDocuments(),
    Pet.countDocuments(),
    Story.countDocuments(),
    Article.countDocuments(),
    Donation.countDocuments(),
  ]);

  res.json({
    success: true,
    data: { rescueCenters, pets, stories, articles, donations },
  });
});

router.get('/geocoding', async (req, res) => {
  const coordinates = await geocodeAddress(req.query.address);
  res.json({ success: true, data: coordinates });
});

router.get('/email', async (req, res) => {
  const result = await sendEmail({
    to: req.query.email,
    subject: 'RescueNet test email',
    text: 'Backend email configuration is working.',
  });

  res.json({ success: true, data: result });
});

module.exports = router;
