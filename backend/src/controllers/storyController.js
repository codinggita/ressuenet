const Story = require('../models/Story');
const { slugify } = require('../utils/helpers');

async function getStories(req, res) {
  const filters = {};

  if (req.query.category && req.query.category !== 'All Stories') {
    filters.category = new RegExp(req.query.category, 'i');
  }

  if (req.query.city) {
    filters.city = new RegExp(req.query.city, 'i');
  }

  const stories = await Story.find(filters).sort({ featured: -1, publishedAt: -1 });
  return res.json({ success: true, count: stories.length, data: stories });
}

async function getStoryById(req, res) {
  const story = await Story.findOne({
    $or: [{ _id: req.params.id }, { slug: req.params.id }],
  });

  if (!story) {
    return res.status(404).json({ success: false, message: 'Story not found.' });
  }

  return res.json({ success: true, data: story });
}

async function createStory(req, res) {
  const story = await Story.create({
    ...req.body,
    slug: req.body.slug || slugify(req.body.title),
  });

  return res.status(201).json({ success: true, data: story });
}

module.exports = { getStories, getStoryById, createStory };
