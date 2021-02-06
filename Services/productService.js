const productModel = require('../Models/product');

async function getAllProducts() {
    try {
        return await productModel.find();
    } catch (error) {
        throw error
    }

}

module.exports = {
    getAllProducts
};