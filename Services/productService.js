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

function getAllProductsKeys() {
    try {
        resetTTL()
        return cachingLayer.keys();
    } catch (error) {
        throw error;
    }
}

async function getProduct(productId) {
    try {
        let product = cachingLayer.get(productId);
        resetTTL()
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
        resetTTL()
        cachingLayer.set(productId, reqBody.data);
        await productModel.updateOne({ _id: productId }, { name: reqBody.data }, { upsert: true });
        return cachingLayer.get(productId);
    } catch (error) {
        // if the maximum number of allowed entried in cache is reached, then the first element that was set in the cache is deleted to allow a ned element to be set

        if (error.name == 'ECACHEFULL') {
            const products = getAllProductsKeys()
            cachingLayer.del(products[0])
            cachingLayer.set(productId, reqBody.data);
        }
        throw error;
    }
}

function deleteProductFromCache(productId) {
    try {
        resetTTL()
        cachingLayer.del(productId)
        return 'record cleaned in cache';
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function deleteAllProductFromCache() {
    try {
        const productsInCache = getAllProductsKeys();
        resetTTL()
        cachingLayer.del(productsInCache)
        return cachingLayer.mget(productsInCache)
    } catch (error) {
        console.error(error);
        throw error
    }
}
function resetTTL() {
    //  cachingLayer.ttl(process.env.MAX_ENTRIES)
    cachingLayer.ttl('existentKey', process.env.MAX_ENTRIES)
}
module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    getAllProductsKeys,
    deleteProductFromCache,
    deleteAllProductFromCache
};