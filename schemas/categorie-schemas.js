var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var categorieSchema = schema({
    categorieP: {
        type: String,
        required: true
    },
    rayon:{
       type: String,
       required: true
   },
  
});

module.exports = mongoose.model('categories', categorieSchema);