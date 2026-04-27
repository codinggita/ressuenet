const mongoose = require('mongoose');

const adoptionApplicationSchema = new mongoose.Schema(
  {
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdoptionApplication', adoptionApplicationSchema);
