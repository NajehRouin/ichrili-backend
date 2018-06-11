var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;



var meslistesSchema = schema({
    libelle: {
        type: String,
        required: true
    },
    date:{
        type :Date,
        required: true
    },
    shared:{
        type : Boolean ,
        required:true

    },
    status:{
        type : Boolean,
        required:true

    }
});
module.exports = mongoose.model('meslistes', meslistesSchema);