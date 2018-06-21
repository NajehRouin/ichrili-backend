var express = require('express');
var router = express.Router();
var userModel = require('../schemas/users-schemas');
var invitationModel = require('../schemas/invitation-schemas');
var mongoose = require('mongoose');

var Q = require('q');

var updateFriendsArray = function (req, res, next) {
    var defer = Q.defer();

    var senderId = req.body.invitation.senderId;
    var recieverId = req.body.invitation.recieverId;
    var friendShipAt = Date.now();
    var friend_name = req.body.invitation.senderName;
    var friend_adress = req.body.invitation.senderAdress;
    var friend_gender = req.body.invitation.senderGender;
    var curretUser_name = req.body.invitation.recieverName;
    var curretUser_adress = req.body.invitation.recieverAdress;
    var currentUser_gender = req.body.invitation.recieverGender;
    var invitationId=req.body.invitation._id;
   

    var promise = function () {
        defer = Q.defer();

        userModel.findOne({ _id: senderId }, (err, user) => {
            var tmpfriends = user.friends;
            var friend = { friendId: '', friendShipAt: null, friend_name: '', region: '', gender: 'homme' };
            friend.friendId = senderId;
            friend.friendShipAt = friendShipAt;
            friend.friend_name = curretUser_name;
            friend.region = curretUser_adress;
            friend.gender = currentUser_gender;

            tmpfriends.push(friend);

            userModel.findOneAndUpdate({ _id: senderId }, { friends: tmpfriends }, (err, user) => {
                if (err) {
                    res.send(err);
                    defer.reject(err);
                }
            })

        })

        //update receiver friends array
        userModel.findOne({ _id: recieverId }, (err, user) => {
            var tmpfriends = user.friends;
            var friend = { friendId: '', friendShipAt: null, friend_name: '', region: '', gender: 'homme' };
            friend.friendId = recieverId;
            friend.friendShipAt = friendShipAt;
            friend.friend_name = friend_name;
            friend.region = friend_adress;
            friend.gender = friend_gender;
            tmpfriends.push(friend);
            userModel.findOneAndUpdate({ _id: recieverId }, { friends: tmpfriends },
                function (err, user) {
                    if (err) {
                        res.send(err);
                        defer.reject(err);
                    }
                   

                    
                });
        }); // userModel.findOne;


        //delete accepted initations 

        invitationModel.findOneAndRemove({_id:invitationId}, function (err, result) {
            if (err) {
                res.send(err);
                defer.reject(err);
            }
            
        });


        defer.resolve();
    } // end promise
    promise();
    next();
} // end midle ware updateFriendArray

router.post('/invitations', (req, res) => {
    var invitation = {
        senderId: req.body.sender._id,
        senderName: req.body.sender.user_name,
        senderGender: req.body.sender.gender,
        senderAdress: req.body.sender.region,
        recieverId: req.body.reciever._id,
        recieverName: req.body.reciever.user_name,
        recieverGender: req.body.reciever.gender,
        recieverAdress: req.body.reciever.region,
    };


    invitationModel.collection.insertOne(invitation, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("Invitation sent Successfully");
        res.send(invitation);
    });
});

router.put('/invitations/accept', updateFriendsArray, (req, res) => {

   
    //console.log("request:body   ", req.body);
});

// Get all pending send invitation out
router.get('/invitations/pending/out/:id', (req, res) => {
    var senderId = req.params.id;
    invitationModel.find({ senderId: senderId }, (err, invitation) => {
        if (err) {
            res.send(err);
        }
        res.send(invitation);
    });
});


// Get all pending recieved invitation in (test ok)
router.get('/invitations/pending/in/:id', function (req, res) {
    var receiverId = req.params.id;
    var invitSenderIds = [];
    invitationModel.find({ recieverId: receiverId }, function (err, invitations) {
        if (err) {
            res.send(err);
        }
        res.send(invitations);
    });
});


module.exports = router;