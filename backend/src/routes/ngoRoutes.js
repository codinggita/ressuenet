const express = require('express');

const controller = require('../controllers/ngoController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', controller.registerNGO);
router.get('/list', controller.listNGOs);
router.put('/:id', protect, authorize('admin', 'ngo'), controller.updateNGO);

module.exports = router;
