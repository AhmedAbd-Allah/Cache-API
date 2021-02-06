const productService = require('../Services/productService')

async function getProduct(req, res) {
    try {
        let contact = await productService.getProduct(req.params.productId);
        res.status(200).send(contact)
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}


module.exports = {
    getProduct
}


