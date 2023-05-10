
const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs')

class ProductController {
    // [GET] api/product/
    index(req, res, next) {
        const limit = parseInt(req.query.limit) || 0;
        Product.find().limit(limit).populate('idCategory')
        .then(product => res.json(product))
        .catch(next);
    }

    // [GET] api/product/get-list
    getList(req, res, next) {
        Product.find().populate('idCategory')
            .then((products) => res.json(products))
    }

    // [GET] api/product/get-all
    getAll(req, res, next){
        Product.find().populate('idCategory')
            .then((product) => {
                const result= {};
                product.forEach(item => {
                    const categoryId = item.idCategory?._id;
                    if (!result[categoryId]) {
                        result[categoryId] = {
                            id: categoryId,
                            name: item.idCategory?.name,
                            products: []
                          };
                    }
                    result[categoryId].products.push({
                        _id: item.id,
                        name: item.name,
                        description: item.description,
                        image: item.image,
                        price: item.price,
                        idCategory: categoryId,
                        slug: item.slug
                      });
                });
                return  res.json(Object.values(result))
            })
            .catch(next);
    }

    // [GET] api/product/list-:slug
    getFind(req, res, next) {
        Category.findOne({slug:req.params.slug})
            .then(category =>{
                Product.find({idCategory: category._id})
                    .then(products => {
                        if(products.length > 0){
                            const id = products[0].idCategory._id;
                            const name = category.name;
                            return res.json([{
                                id,
                                name,
                                products}])
                        } else {
                            return res.json()
                        }
                    })
                    .catch(error => console.log(error))
            })
            .catch(next)
    }

    // [GET] api/product/:slug
    getOne(req, res, next) {
        Product.findOne({slug: req.params.slug}).populate('idCategory')
            .then(product => {
                if (!product) {
                    return res.status(404).json({ message: "Not Found" });
                }
                res.json(product)
            })
            .catch(next)
    }  

    // [POST] api/product/add
    async add(req, res, next) {
        try {
            const { name, description, price, idCategory } = req.body;
            const image = req.file.filename;
        
            const product = new Product({
              name,
              description,
              price,
              idCategory,
              image
            });
        
            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
          } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
          }

        
    }
    
    // [DELETE] api/product/:id
    async delete(req, res, next) {
        try{
            const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(404).json({ message: 'Not found'});
            }

            // xóa ảnh trên sever
            const imagePath = `./src/public/images/products/${product.image}`;
            fs.unlink(imagePath,(error) => {
                if(error){
                    console.log(error);
                }
            })

            await Product.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'Xóa sản phẩm thành công' });

        }catch(error){
            return res.status(500).json({ message: 'Lỗi server' });
        }
        
    }

    // [UPDATE] api/product/:id
    async update(req, res, next) {
        const { name, description, price, category } = req.body;
        const image = req.file?.filename;
        try{
            const product = await Product.findById(req.params.id);
            const updates = { name, description, price, idCategory: category };

            if(image){
                updates.image = image;
                const imagePath = `./src/public/images/products/${product.image}`; 
                await fs.promises.unlink(imagePath);
            }

            await Product.updateOne({ _id: req.params.id }, updates)
    
            return res.status(200).json({ message: 'success' });
        }catch(error){
            return res.status(500).json({ message: 'Lỗi server' });
        }
    } 

}

module.exports = new ProductController();