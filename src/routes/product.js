const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { productUpload } = require('../middleware/multer')

router.get('/get-all',productController.getAll)
router.get('/get-list',productController.getList)
router.post('/add',productUpload.single('image'),productController.add)
router.get('/list-:slug',productController.getFind)
router.get('/',productController.index)
router.get('/:slug',productController.getOne)
router.delete('/:id',productController.delete)
router.put('/:id',productUpload.single('image'),productController.update)

module.exports = router;