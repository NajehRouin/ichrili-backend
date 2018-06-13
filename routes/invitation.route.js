var express = require('express');
var router = express.Router();
var userModel = require('../schemas/users-schemas');
var invitationModel = require('../schemas/invitation-schemas');
var mongoose = require('mongoose');
var Q = require('q');



router.post('/invitations', (req, res) => {
    var invitation = {
        senderId: req.body.senderId,
        recieverId: req.body.recieverId,
    };


    invitationModel.collection.insertOne(invitation, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("Invitation sent Successfully");
        res.send(invitation);
    });
});

router.put('/invitations/accept/:senderId', (req, res) => {
    var senderId = req.params.senderId;
    var recieverId = req.body.recieverId;
    userModel.find({ _id: senderId }, (err, user) => {
        var tmpfriends = user[0].friends;
        var friend = {};
        friend.friendId = recieverId;
        friend.friendShipAt = Date.now();
        tmpfriends.push(friend);
        userModel.findOneAndUpdate({ _id: senderId }, { friends: tmpfriends }, (err, user) => {
            if (err) {
                res.send(err)
            }
            console.log(user);

        })
    })

    //update receiver friends array
    userModel.find({ _id: recieverId }, (err, user) => {
        var tmpfriends = user[0].friends;
        var friend = {};
        friend.friendId = senderId;
        friend.friendShipAt = Date.now();
        tmpfriends.push(friend);
        userModel.findOneAndUpdate({ id: recieverId }, { friends: tmpfriends },
            (err, user) => {
                if (err) {
                    res.send(err)
                }
                console.log(user);
                res.send(user);
            })
    })


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
router.get('/invitations/pending/in/:id', (req, res) => {
    var receiverId = req.params.id;
    invitationModel.find({ recieverId: receiverId }, (err, invitation) => {
        if (err) { 
            res.send(err)
         };
        res.send(invitation);
    });
});


module.exports = router;