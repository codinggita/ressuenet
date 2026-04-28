const express = require('express');

const controller = require('../controllers/volunteerController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'idDocument', maxCount: 1 },
  ]),
  controller.registerVolunteer
);
router.get('/opportunities', controller.getVolunteerOpportunities);
router.put('/update', controller.updateVolunteer);

module.exports = router;
