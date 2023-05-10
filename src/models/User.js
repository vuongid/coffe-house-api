
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const UserSchema = new Schema( 
{
    userName: { type: String },
    password: {type: String},
    role:{type: String, default: 'user'},
    name: {type: String},
    email: {type: String},
    address: {type: String},
    phone: {type: Number},
})


module.exports = mongoose.model('User', UserSchema);