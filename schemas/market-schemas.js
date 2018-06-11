var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var marketSchema = schema({
    market_name: {
        type: String,
        required: true
    },
   Adresse:{
       type: String,
       required: true
   },
    ville: {
        type: String,
        required: true
    },
    photo: String,
    position:{
        type :String,
        required :true 
    }
});

module.exports = mongoose.model('markets', marketSchema);