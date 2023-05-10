const express = require('express');
const router = express.Router();
const blogController = require('../controllers/BlogController');
const { blogUpload } = require('../middleware/multer')

router.get('/get-list',blogController.getList)
router.get('/home-blog',blogController.homeBlog)
router.get('/list/:slug',blogController.getBlogBySlug)
router.get('/new-blog',blogController.newBlogs)
router.post('/add',blogUpload.single('image'),blogController.add)
router.delete('/:id',blogController.delete)
router.get('/:id',blogController.getBlog)
router.put('/:id',blogUpload.single('image'),blogController.update)

module.exports = router;