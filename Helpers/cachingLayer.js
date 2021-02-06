const NodeCache = require("node-cache");
const cachingLayer = new NodeCache({
    stdTTL: process.env.TTL,
    maxKeys: process.env.MAX_ENTRIES
});




module.exports = cachingLayer;