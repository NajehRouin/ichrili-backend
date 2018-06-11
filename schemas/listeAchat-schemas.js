var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var listAchatSchema = schema({
    produit: {
        type: String,
        required: true
    },

    market: {
        type: String,
        required: true
    },
    qte: {
        type: Number,
        require: true
    },
    prix: {
        type: Number,
        require: true
    },

    totale: {
        type: Number,
        require: true
    }

});

module.exports = mongoose.model('listeAchats', listAchatSchema);
