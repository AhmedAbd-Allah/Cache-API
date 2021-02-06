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

async function getAllProductsKeys() {
    try {
        return cachingLayer.keys();
        return keys;
    } catch (error) {
        throw error;
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

async function createProduct(productId, reqBody) {
    try {
        await productModel.updateOne({ _id: productId }, { name: reqBody.data }, { upsert: true });
        cachingLayer.set(productId, reqBody.data);
        return cachingLayer.get(productId);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function deleteProductFromCache(productId) {
    try {
        cachingLayer.del(productId)
        return 'record cleaned in cache';
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    getAllProductsKeys,
    deleteProductFromCache
};