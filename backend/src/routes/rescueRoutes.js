const express = require('express');
const { body } = require('express-validator');

const controller = require('../controllers/rescueController');
const upload = require('../middleware/upload');
const { handleValidation } = require('../middleware/validator');

const router = express.Router();

router.get('/nearby', controller.getNearbyRescues);
router.get('/search', controller.searchRescues);
router.get('/emergency', controller.getEmergencyRescues);
router.get('/overview', controller.getPlatformOverview);
router.get('/dashboard', controller.getLiveDashboard);
router.get('/dashboard/complete', controller.getCompleteDashboard);
router.get('/:id', controller.getRescueById);
router.post(
  '/report',
  upload.single('photo'),
  [
    body('location').trim().notEmpty().withMessage('Location is required.'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long.'),
    handleValidation,
  ],
  controller.reportAnimal
);

module.exports = router;
