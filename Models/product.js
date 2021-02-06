const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const randomstring = require("randomstring");

const productSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: uuidv4()
    },
    name: {
        type: String,
        default: randomstring.generate()
    }
});


mongoose.model('Products', productSchema);
module.exports = mongoose.model('Products');