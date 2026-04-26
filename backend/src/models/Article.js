const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, trim: true, index: true },
    type: { type: String, trim: true },
    readTime: { type: String, trim: true },
    summary: { type: String, trim: true },
    content: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    mediaUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
