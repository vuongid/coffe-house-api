
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const StoreSchema = new Schema( 
{
    name: { type: String },
    description: { type: String},
    image: { type: String },
    address: { type: String },
    time: { type: String },
    idLocation: { type: Schema.Types.ObjectId, ref: 'Location'},
    slug: { type: String, slug: 'name', unique: true},
})

mongoose.plugin(slug);

module.exports = mongoose.model('Store', StoreSchema);