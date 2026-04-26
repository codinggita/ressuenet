const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contactPerson: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    description: { type: String, trim: true },
    services: [{ type: String }],
    verified: { type: Boolean, default: false },
    website: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NGO', ngoSchema);
