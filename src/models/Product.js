
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const ProductSchema = new Schema( 
{
    name: { type: String },
    description: { type: String},
    image: { type: String },
    price: { type: Number },
    idCategory: { type: Schema.Types.ObjectId, ref: 'Category'},
    slug: { type: String, slug: 'name', unique: true},
})

mongoose.plugin(slug);

module.exports = mongoose.model('Product', ProductSchema);