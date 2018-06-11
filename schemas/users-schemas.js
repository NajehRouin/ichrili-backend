var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;


var userSchema = schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        default: 'default_avatar.png'
    },
    gender: {
        type: String,
        required: true,
        default: 'Homme'
    },
    region: {
        type: String,
        default: 'Mahdia'
    },
    email:{
        type: String,
        require:true
    },
    numtel: {
        type : Number ,
        require:true
    },
    facebookAut: {
        ClientID: String,
        ClientSecret: String,
        ClientCallback: String
    },
    twitterAuth: {
        consumerKey: String,
        consumerSecret: String,
        callbackURL: String
    },
    googleAuth: {
        ClientID: String,
        ClientSecret: String,
        ClientCallback: String
    },
    friends: [{
        friendId: {
            type: String,
            ref: 'users',
            friendShipAt: {
                type: Date,
                defaut: Date.now()
            }
        }
    }]
});

module.exports = mongoose.model('users', userSchema);