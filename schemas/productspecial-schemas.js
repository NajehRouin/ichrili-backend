var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var productspecialSchema = schema({
    label: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    BudgetMin: {
        type: String,
        required: true
    },
    BudgetMax: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('productSpecials', productspecialSchema);