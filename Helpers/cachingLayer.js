const randomstring = require("randomstring");
const NodeCache = require("node-cache");
const cachingLayer = new NodeCache({
    stdTTL: process.env.TTL,
    maxKeys: process.env.MAX_ENTRIES,
    //deleteOnExpire: true,
    //  checkperiod: process.env.TTL
});


module.exports = cachingLayer;