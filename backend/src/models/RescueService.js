const mongoose = require('mongoose');

const rescueServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['NGO', 'Veterinary', 'Ambulance', 'Government'],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: { type: String, trim: true },
      city: { type: String, trim: true, index: true },
      state: { type: String, trim: true, index: true },
      pincode: { type: String, trim: true },
    },
    contact: {
      phone: [{ type: String }],
      email: { type: String, trim: true },
      whatsapp: { type: String, trim: true },
    },
    services: [{ type: String }],
    operatingHours: {
      is24x7: { type: Boolean, default: false },
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    verified: { type: Boolean, default: true },
    rating: { type: Number, default: 4.5 },
    totalRescues: { type: Number, default: 0 },
    images: [{ type: String }],
    source: { type: String, trim: true },
  },
  { timestamps: true }
);

rescueServiceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('RescueService', rescueServiceSchema);
