const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, trim: true },
    content: { type: String, trim: true },
    category: { type: String, trim: true, index: true },
    city: { type: String, trim: true },
    organization: { type: String, trim: true },
    image: { type: String, trim: true },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    readTime: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);
