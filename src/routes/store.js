
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/StoreController');
const { storeUpload } = require('../middleware/multer')


router.get('/get-all',storeController.getAll)
router.post('/add',storeUpload.single('image'),storeController.add)
router.get('/list-:slug',storeController.getBySlug)

module.exports = router;