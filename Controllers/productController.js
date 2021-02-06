const productService = require('../Services/productService')
const responseBuilder = require('../Helpers/response/responseBuilder');

async function getProduct(req, res) {
    try {
        let product = await productService.getProduct(req.params.productId);
        responseBuilder.sendResponse('success', '', product, res, 'Product retrieved successfully')
    } catch (error) {
        console.error(error);
        responseBuilder.sendResponse('failure', error, '', res, 'failed to retrieve product')
    }
}

async function getAllProducts(req, res) {
    try {
        let product = productService.getAllProductsKeys();
        responseBuilder.sendResponse('success', '', product, res, 'All Products retrieved successfully')
    } catch (error) {
        console.error(error);
        responseBuilder.sendResponse('failure', error, '', res, 'failed to retrieve all products')
    }
}

async function createProduct(req, res) {
    try {
        console.log(req.body);
        let product = await productService.createProduct(req.params.productId, req.body);
        responseBuilder.sendResponse('success', '', product, res, 'Product updated successfully')
    } catch (error) {
        console.error(error);
        responseBuilder.sendResponse('failure', error, '', res, 'failed to update product')
    }
}

async function deleteProductFromCache(req, res) {
    try {
        let product = productService.deleteProductFromCache(req.params.productId);
        responseBuilder.sendResponse('success', '', product, res, 'Product deleted successfully')
    } catch (error) {
        console.error(error);
        responseBuilder.sendResponse('failure', error, '', res, 'failed to delete product')
    }
}


async function deleteAllProductFromCache(req, res) {
    try {
        let product = productService.deleteAllProductFromCache();
        responseBuilder.sendResponse('success', '', product, res, 'All Products deleted successfully')
    } catch (error) {
        console.error(error);
        responseBuilder.sendResponse('failure', error, '', res, 'failed to delete all products')
    }
}


module.exports = {
    getProduct,
    getAllProducts,
    createProduct,
    deleteProductFromCache,
    deleteAllProductFromCache
}


