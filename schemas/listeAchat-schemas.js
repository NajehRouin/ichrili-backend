var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash');
var mongoClient = require('mongodb').MongoClient;
var BSON = mongoClient.BSONPure;



var listAchatSchema = schema({

    label: { type: String, required: true },
    date_creation: { type: Date, required: true, default: Date.now },
    owner: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        ville: { type: String, required: true }
    },
    items: [{
        ord: {
            type: Number
        },
        produit: {
            designation: { type: String, required: true },
            market: { type: String, required: true },
            categorie: { type: String, required: true },
            price: { type: Number },
            unite: { type: String, required: true },
            photo_url: { type: String }

        },
        qte: {
            type: Number,
            require: true
        }

    }],
    yetShared:{type:Boolean, Default:false},
    sharedWith:{
        friendId:{Type:String},
        friend_name:{Type:String},
    }


});

module.exports = mongoose.model('listeAchats', listAchatSchema);
