const crypto = require('crypto');

const Donation = require('../models/Donation');
const { getRazorpayClient } = require('../utils/payment');

async function createDonation(req, res) {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: 'A valid amount is required.' });
  }

  const razorpay = getRazorpayClient();
  let order = null;

  if (razorpay) {
    order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });
  }

  const donation = await Donation.create({
    user: req.user?._id,
    amount,
    paymentMethod: req.body.paymentMethod || 'unknown',
    purpose: req.body.purpose || 'General Rescue Fund',
    donorName: req.body.donorName,
    donorEmail: req.body.donorEmail,
    isRecurring: req.body.isRecurring === true,
    recurringFrequency: req.body.recurringFrequency || null,
    gatewayOrderId: order?.id,
  });

  return res.status(201).json({
    success: true,
    message: 'Donation order created.',
    data: {
      donation,
      order,
      key: process.env.RAZORPAY_KEY_ID || null,
    },
  });
}

async function verifyDonation(req, res) {
  const donation = await Donation.findById(req.body.donationId);

  if (!donation) {
    return res.status(404).json({ success: false, message: 'Donation not found.' });
  }

  donation.status = req.body.paymentId ? 'Success' : 'Failed';
  donation.transactionId = req.body.paymentId || `manual_${crypto.randomBytes(6).toString('hex')}`;
  donation.receiptUrl = `/api/donation/receipt?donationId=${donation._id}`;
  await donation.save();

  return res.json({ success: true, message: 'Donation payment recorded.', data: donation });
}

async function getHistory(req, res) {
  const query = req.user ? { user: req.user._id } : {};
  const donations = await Donation.find(query).sort({ createdAt: -1 });
  return res.json({ success: true, count: donations.length, data: donations });
}

async function getStats(req, res) {
  const stats = await Donation.aggregate([
    {
      $group: {
        _id: '$status',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  const successful = stats.find((item) => item._id === 'Success');
  return res.json({
    success: true,
    data: {
      breakdown: stats,
      totalRaised: successful?.totalAmount || 0,
      successfulDonations: successful?.count || 0,
    },
  });
}

async function generateReceipt(req, res) {
  const donationId = req.body.donationId || req.query.donationId;
  const donation = await Donation.findById(donationId);

  if (!donation) {
    return res.status(404).json({ success: false, message: 'Donation not found.' });
  }

  return res.json({
    success: true,
    data: {
      receiptNumber: `RCT-${String(donation._id).slice(-6).toUpperCase()}`,
      donatedAt: donation.createdAt,
      amount: donation.amount,
      currency: donation.currency,
      donorName: donation.donorName || 'Anonymous donor',
      purpose: donation.purpose,
    },
  });
}

module.exports = {
  createDonation,
  verifyDonation,
  getHistory,
  getStats,
  generateReceipt,
};
