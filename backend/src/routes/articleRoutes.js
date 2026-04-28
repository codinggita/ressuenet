const express = require('express');

const controller = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.getArticles);
router.get('/:id', controller.getArticleById);
router.post('/', protect, authorize('admin'), controller.createArticle);

module.exports = router;
