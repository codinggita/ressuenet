const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    skills: [{ type: String }],
    availability: [{ type: String }],
    certifications: { type: String, trim: true },
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
    preferredSpecies: [{ type: String }],
    preferredTasks: [{ type: String }],
    travelRadius: { type: String, trim: true },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    idDocumentUrl: { type: String, trim: true },
    profilePhotoUrl: { type: String, trim: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
