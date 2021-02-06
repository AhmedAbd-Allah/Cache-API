const productService = require('../Services/productService')

async function getProduct(req, res) {
    try {
        let product = await productService.getProduct(req.params.productId);
        res.status(200).send(product)
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

async function getAllProducts(req, res) {
    try {
        let product = productService.getAllProductsKeys();
        res.status(200).send(product)
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

async function createProduct(req, res) {
    try {
        console.log(req.body);
        let product = await productService.createProduct(req.params.productId, req.body);
        res.status(200).send(product)
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

async function deleteProductFromCache(req, res) {
    try {
        let product = productService.deleteProductFromCache(req.params.productId);
        res.status(200).send(product)
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}


async function deleteAllProductFromCache(req, res) {
    try {
        let product = productService.deleteAllProductFromCache();
        res.status(200).send(product)
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}


module.exports = {
    getProduct,
    getAllProducts,
    createProduct,
    deleteProductFromCache,
    deleteAllProductFromCache
}


