const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: {
      type: String,
      enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Cow', 'Wild', 'Other'],
      required: true,
    },
    breed: { type: String, trim: true },
    age: { type: Number, default: 0 },
    ageLabel: { type: String, trim: true },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Male' },
    size: { type: String, enum: ['Small', 'Medium', 'Large'], default: 'Medium' },
    color: { type: String, trim: true },
    city: { type: String, trim: true, index: true },
    images: [{ type: String }],
    description: { type: String, trim: true },
    personality: [{ type: String }],
    healthStatus: {
      vaccinated: { type: Boolean, default: false },
      neutered: { type: Boolean, default: false },
      medicalHistory: { type: String, trim: true },
    },
    adoptionStatus: {
      type: String,
      enum: ['Available', 'Pending', 'Adopted', 'Rescue Partner'],
      default: 'Available',
    },
    shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'RescueService' },
    urgencyLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    postedDate: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);
