const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentMethod: { type: String, trim: true },
    transactionId: { type: String, trim: true },
    gatewayOrderId: { type: String, trim: true },
    status: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' },
    purpose: { type: String, trim: true, default: 'General Rescue Fund' },
    isRecurring: { type: Boolean, default: false },
    recurringFrequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', null], default: null },
    donorName: { type: String, trim: true },
    donorEmail: { type: String, trim: true },
    receiptUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
