const express = require('express');

const controller = require('../controllers/storyController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.getStories);
router.get('/:id', controller.getStoryById);
router.post('/', protect, authorize('admin'), controller.createStory);

module.exports = router;
