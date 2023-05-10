const Cart = require('../models/Cart');

class CartController {
    // [POST] api/cart/add
    add(req, res, next) {
        const {totalPrice, totalQuantity, products,address,note} = req.body;
        const cart = new Cart({
            userId: req.user._id,
            products,
            totalPrice,
            totalQuantity,
            address,
            note
        })

        cart.save().then(() => {
            res.status(201).json({ message: "cart created" });
          }).catch(err => {
            next(err);
          });
    }

    // [GET] api/cart/get
    get(req,res,next){
        Cart.find()
            .populate('userId')
            .populate('products.productId')
            .then(cart =>  res.json(cart))
    }
}

module.exports = new CartController();