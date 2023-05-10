
const Category = require('../models/Category')

class CategoryController {
    
    // [GET] api/category/get-all
    getAll(req, res, next){
        Category.find()
            .then((category) => {
                res.json(category)})
            .catch(next);
    }
    
    // [POST] api/category/add
    add(req, res, next) {
        const category = new Category(req.body);
        category
            .save()
            .then(()=> res.status(201).json({ message: "created" }))
            .catch(next);
    }

    // [DELETE] api/category/:id
    delete(req, res, next){
        Category.deleteOne({_id: req.params.id})
            .then(()=> res.json({ message: "success" }))
            .catch(next)
    }

    // [PUT] api/category/:id
    update(req, res, next){
        Category.updateOne({ _id: req.params.id }, req.body)
        .then(()=> res.json({ message: "success" }))
        .catch(next);
    }

    // [GET] api/category/:id
    one(req, res, next){
        Category.findOne({_id: req.params.id})
            .then((category) => {
                res.json(category)})
            .catch(next);
    }
}

module.exports = new CategoryController();