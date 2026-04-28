const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const { sendEmail } = require('../utils/email');

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
}

function publicUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    city: user.city,
    role: user.role,
    organizationName: user.organizationName,
    favorites: user.favorites,
  };
}

async function register(req, res) {
  const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });

  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }

  const role = req.body.accountType === 'NGO' ? 'ngo' : 'user';

  const user = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    password: req.body.password,
    organizationName: req.body.organizationName,
    role,
  });

  const token = signToken(user._id);

  return res.status(201).json({
    success: true,
    message: 'Registration successful.',
    token,
    data: publicUser(user),
  });
}

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email.toLowerCase() }).select('+password');

  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = signToken(user._id);

  return res.json({
    success: true,
    message: 'Login successful.',
    token,
    data: publicUser(user),
  });
}

function logout(req, res) {
  return res.json({
    success: true,
    message: 'Logout successful. Remove the token on the client.',
  });
}

function getCurrentUser(req, res) {
  return res.json({
    success: true,
    data: publicUser(req.user),
  });
}

async function updateProfile(req, res) {
  const updates = {
    fullName: req.body.fullName ?? req.user.fullName,
    phone: req.body.phone ?? req.user.phone,
    city: req.body.city ?? req.user.city,
    organizationName: req.body.organizationName ?? req.user.organizationName,
  };

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  return res.json({
    success: true,
    message: 'Profile updated.',
    data: publicUser(user),
  });
}

async function forgotPassword(req, res) {
  const user = await User.findOne({ email: req.body.email.toLowerCase() });

  if (!user) {
    return res.json({
      success: true,
      message: 'If that email exists, reset instructions have been prepared.',
    });
  }

  const resetToken = crypto.randomBytes(16).toString('hex');
  await sendEmail({
    to: user.email,
    subject: 'RescueNet password reset',
    text: `Use this temporary reset token: ${resetToken}`,
  });

  return res.json({
    success: true,
    message: 'Password reset instructions sent if email delivery is configured.',
    data: { resetToken },
  });
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  forgotPassword,
};
