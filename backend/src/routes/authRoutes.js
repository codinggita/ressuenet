const express = require('express');
const { body } = require('express-validator');

const controller = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { handleValidation } = require('../middleware/validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    handleValidation,
  ],
  controller.register
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty(), handleValidation], controller.login);
router.post('/logout', controller.logout);
router.get('/me', protect, controller.getCurrentUser);
router.put('/update-profile', protect, controller.updateProfile);
router.post('/forgot-password', [body('email').isEmail(), handleValidation], controller.forgotPassword);

module.exports = router;
