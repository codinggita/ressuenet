const Article = require('../models/Article');
const { slugify } = require('../utils/helpers');

async function getArticles(req, res) {
  const filters = {};

  if (req.query.category) {
    filters.category = new RegExp(req.query.category, 'i');
  }

  const articles = await Article.find(filters).sort({ featured: -1, createdAt: -1 });
  return res.json({ success: true, count: articles.length, data: articles });
}

async function getArticleById(req, res) {
  const article = await Article.findOne({
    $or: [{ _id: req.params.id }, { slug: req.params.id }],
  });

  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found.' });
  }

  return res.json({ success: true, data: article });
}

async function createArticle(req, res) {
  const article = await Article.create({
    ...req.body,
    slug: req.body.slug || slugify(req.body.title),
  });

  return res.status(201).json({ success: true, data: article });
}

module.exports = { getArticles, getArticleById, createArticle };
