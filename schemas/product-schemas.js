var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var productSchema = schema({
    designation: {
        type: String,
        required: true
    },
    price: Number,
    category: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: true
    },
unite:{
type: String ,
required :true
},
    photo_url: String
});

module.exports = mongoose.model('products', productSchema);