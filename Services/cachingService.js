const productModel = require('../Models/product');
const cachingLayer = require('../Helpers/cachingLayer')
const productService = require('./productService')

async function cacheDataFromDB() {
    try {
        const products = await productService.getAllProducts();
        if (products.length > 0) {
            const cacheSet = await prepareDataForCaching(products)
            await saveDataInCache(cacheSet)
        }
        return true;
    } catch (error) {
        console.error(error)
        //if the maximum number of allowed entried in cache is reached, then the first element that was set in the cache is deleted to allow a ned element to be set
        if (error.name == 'ECACHEFULL') {
            const products = productService.getAllProductsKeys()
            for (let i = 0; i < products.length; i++) {
                if (products.length > process.env.MAX_ENTRIES)
                    cachingLayer.del(products[i])
            }
        }
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

}