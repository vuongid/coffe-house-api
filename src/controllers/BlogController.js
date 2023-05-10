const Blog = require('../models/Blog');
const fs = require('fs')

class BlogController {

    // [GET] api/blog/get-list
    async getList(req, res, next) {
        try {
            const getBlogs = await Blog.find()
            return res.status(200).json(getBlogs);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    // [GET] api/blog/home-blog
    async homeBlog(req, res, next) {
        try {
            const [coffeeholic, teaholic, blog] = await Promise.all([
                Blog.find({ category: 'Coffeeholic' }).sort({ createdAt: -1 }).limit(3),
                Blog.find({ category: 'Teaholic' }).sort({ createdAt: -1 }).limit(3),
                Blog.find({ category: 'Blog' }).sort({ createdAt: -1 }).limit(3),
            ]);
            
            return res.status(200).json([
                {
                    category: 'Coffeeholic',
                    blogs: coffeeholic
                },
                {
                    category: 'Teaholic',
                    blogs: teaholic
                },
                {
                    category: 'Blog',
                    blogs: blog
                }
            ]);
            
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    // [GET] api/blog/list/:slug
    async getBlogBySlug(req, res, next) {
        try {
            const blogs = await Blog.find({category: req.params.slug})
            return res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    // [GET] api/blog/new-blog
    async newBlogs(req, res, next) {
        try {
            const getBlogs = await Blog.find().sort({createdAt: -1}).limit(2);
            return res.status(200).json(getBlogs);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    // [POST] api/blog/add
    async add(req, res, next) {
        try {
            const { title, category, content } = req.body;
            const image = req.file.filename;
        
            const blog = new Blog({
                title,
                category,
                content,
                image
            });
        
            const savedBlog = await blog.save();
            return res.status(201).json(savedBlog);
          } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
          }
    }

    // [DELETE] api/blog/:id
    async delete(req, res, next){
        try {  
            const blog = await Blog.findById(req.params.id);

            if(!blog){
                return res.status(404).json({message: 'Not found'});
            }

            // xóa ảnh trên sever
            const imagePath = `./src/public/images/blogs/${blog.image}`;
            fs.unlink(imagePath,(error) =>{
                if(error){
                    console.log(error)
                }
            })

            await Blog.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: 'Success'});
        } catch (error) {
            console.log(error);
            return res.status(500).send('Server error');
        }
    }

    // [GET] api/blog/:id
    async getBlog(req, res, next){
        try { 
            const blog = await Blog.findById(req.params.id);
            return res.status(200).json(blog)
        } catch (error) {
            return res.status(500).send('Server error');
        }
    }

    // [UPDATE] api/blog/:id
    async update(req, res, next) {
        const { title, category, content } = req.body;
        const image = req.file?.filename;
        try{
            const blog = await Blog.findById(req.params.id);
            const updates = { title, category, content };

            if(image){
                updates.image = image;
                const imagePath = `./src/public/images/blogs/${blog.image}`; 
                await fs.promises.unlink(imagePath);
            }

            await Blog.updateOne({ _id: req.params.id }, updates)
    
            return res.status(200).json({ message: 'Success' });
        }catch(error){
            return res.status(500).json({ message: 'Server error' });
        }
    }

}

module.exports = new BlogController();