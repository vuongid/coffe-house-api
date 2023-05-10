const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verifyToken = require('../middleware/verifyToken')

router.post('/add',userController.add)
router.get('/get',userController.get)
router.get('/me',verifyToken,userController.me)

module.exports = router;