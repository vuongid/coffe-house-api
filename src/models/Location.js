
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')

const LocationSchema = new Schema(
    {
        name: {type: String},
        slug: {type: String, slug: 'name', unique: true},
    }
)

mongoose.plugin(slug)

module.exports = mongoose.model('Location', LocationSchema);