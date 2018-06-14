var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var invitationSchema = schema({
    sender_id: {
        type: String,
        required: true
    },
    reciever_id: {
        type: String,
        require: true
    },
    responding_date: Date,
    pending: Boolean

});

module.exports = mongoose.model('invitations', invitationSchema);