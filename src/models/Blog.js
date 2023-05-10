
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const BlogSchema = new Schema( 
{
    title: {type: String},
    content: {type: String},
    image: { type: String },
    category: { type: String},
    slug: { type: String, slug: 'title', unique: true},
    createdAt: {type: Date, default: Date.now},
})

mongoose.plugin(slug);

module.exports = mongoose.model('Blog', BlogSchema);