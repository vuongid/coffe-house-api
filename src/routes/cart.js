const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const verifyToken = require('../middleware/verifyToken')

router.post('/add',verifyToken,cartController.add)
router.get('/get',cartController.get)

module.exports = router;