const mongoose = require('mongoose');

const rescueReportSchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true, unique: true },
    locationText: { type: String, required: true, trim: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    species: { type: String, trim: true },
    severity: { type: Number, min: 1, max: 5, default: 3 },
    urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    description: { type: String, trim: true },
    isAnonymous: { type: Boolean, default: false },
    reporterName: { type: String, trim: true },
    reporterPhone: { type: String, trim: true },
    photoUrl: { type: String, trim: true },
    status: { type: String, enum: ['Open', 'Dispatched', 'Resolved'], default: 'Open' },
    assignedCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'RescueService' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RescueReport', rescueReportSchema);
