const express = require('express');
const { body } = require('express-validator');

const controller = require('../controllers/adoptionController');
const { protect } = require('../middleware/auth');
const { handleValidation } = require('../middleware/validator');

const router = express.Router();

router.get('/pets', controller.getPets);
router.get('/pets/:id', controller.getPetById);
router.post('/favorite', protect, [body('petId').notEmpty(), handleValidation], controller.addFavorite);
router.delete('/favorite/:id', protect, controller.removeFavorite);
router.get('/favorites', protect, controller.getFavorites);
router.post(
  '/apply',
  [
    body('petId').notEmpty(),
    body('fullName').trim().notEmpty(),
    body('email').isEmail(),
    handleValidation,
  ],
  controller.submitApplication
);

module.exports = router;
