const express = require('express');

const controller = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create', controller.createDonation);
router.post('/verify', controller.verifyDonation);
router.get('/history', protect, controller.getHistory);
router.get('/stats', controller.getStats);
router.post('/receipt', controller.generateReceipt);
router.get('/receipt', controller.generateReceipt);

module.exports = router;
