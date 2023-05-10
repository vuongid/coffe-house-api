const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/get-all',categoryController.getAll)
router.post('/add',categoryController.add)
router.get('/:id',categoryController.one)
router.delete('/:id',categoryController.delete)
router.put('/:id',categoryController.update)

module.exports = router;