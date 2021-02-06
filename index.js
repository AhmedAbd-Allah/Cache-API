require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json({ extended: false }));


// allow cross origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// server up
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is on and listening on port ", process.env.SERVER_PORT);
});

module.exports = app
