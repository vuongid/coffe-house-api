const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [{
    _id: false,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    }
  }],
  totalPrice: {
    type: Number,
  },
  totalQuantity: {
    type: Number,
  },
  address:{type: String},
  note:{type:String}
});


module.exports = mongoose.model('Cart', cartSchema);
