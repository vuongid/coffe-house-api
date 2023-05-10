
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/LocationController');

router.get('/get-all',locationController.getAll)
router.post('/add',locationController.add)

module.exports = router;