require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');



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

// app.get('/contacts', contactController.getAllContacts)
// app.get('/contact/:contactId', contactController.getContact)
// app.post('/contact', contactController.createContact)
// app.delete('/contact/:contactId', contactController.deleteContact)
// app.patch('/contact/:contactId', contactController.updateContact)


// server up
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is on and listening on port ", process.env.SERVER_PORT);
});

module.exports = app
