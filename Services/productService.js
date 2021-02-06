const productModel = require('../Models/product');
const cachingLayer = require('../Helpers/cachingLayer')
const randomstring = require("randomstring");



async function getAllProducts() {
    try {
        return await productModel.find();
    } catch (error) {
        throw error
    }

}

async function getProduct(productId) {
    try {
        let product = cachingLayer.get(productId);
        if (product) {
            console.log("Cache hit");
        }
        else {
            console.log("Cache miss");
            product = randomstring.generate();
            cachingLayer.set(productId, product);
        }
        return product;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProduct
};