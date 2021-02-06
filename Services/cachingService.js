const productModel = require('../Models/product');
const productService = require('./productService');
const NodeCache = require("node-cache");
const cachingLayer = new NodeCache({
    stdTTL: process.env.TTL,
    maxKeys: process.env.MAX_ENTRIES
});


async function cacheDataFromDB() {
    try {
        const products = await productService.getAllProducts()
        if (products.length > 0) {
            const cacheSet = await prepareDataForCaching(products)
            await saveDataInCache(cacheSet)
        }
        return true;
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function prepareDataForCaching(data) {
    try {
        let CacheSets = data.map(dbRecord => {
            return {
                key: dbRecord._id,
                val: dbRecord.name,
            }
        })
        return CacheSets
    } catch (error) {
        throw error;
    }
}

async function saveDataInCache(data) {
    try {
        const success = cachingLayer.mset(data)
        return success;

    } catch (error) {
        console.error(error)
        throw error;
    }
}




module.exports = {
    cacheDataFromDB,
    cachingLayer,

}