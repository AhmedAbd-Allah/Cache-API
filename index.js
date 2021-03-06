require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const cachingService = require('./Services/cachingService');
const productController = require('./Controllers/productController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./apiDocs/swagger.json');

// Start database connection
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
    } catch (error) {
        console.error(error)
    }
})()


// parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));


// sanitize requests  to prevent MongoDB Operator Injection
app.use(mongoSanitize());


// allow cross origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// get product data and save it in the cache
cachingService.cacheDataFromDB()

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app routes
app.get('/products/:productId', productController.getProduct)
app.get('/products', productController.getAllProducts)
app.post('/product/:productId', productController.createProduct)
app.delete('/product/cache/:productId', productController.deleteProductFromCache)
app.delete('/products/cache/clear', productController.deleteAllProductFromCache)



// server up
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is on and listening on port ", process.env.SERVER_PORT);
});

module.exports = app
