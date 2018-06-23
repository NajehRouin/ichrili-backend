var express = require('express');
var router = express.Router();
var listeAchatModel = require('../schemas/listeAchat-schemas');

router.post('/listeAchats', function (req, res) {

    var list = {
        label: req.body.label,
        date_creation: req.body.date_creation,
        owner: req.body.owner,
        items: req.body.items
    };
    listeAchatModel.insertMany(list, function (err, done) {
        if (err) {
            res.send({ err: err });
        }
        res.send("1 List successufully inserted ");
    });
});

router.get('/listeAchats', function (req, res) {
    listeAchatModel.find(function (err, liste) {
        if (err) res.send(err);
        res.send(liste);

    });
});

router.get('/listeAchats/owner/:id', function (req, res) {
    var ownerId = req.params.id;
    listeAchatModel.find({ 'owner.id': ownerId }, function (err, liste) {
        if (err) res.send(err);

        res.send(liste);

    });
});

//get ListAchat shared by friend;
router.get('/listeAchats/friend/:id', function (req, res) {
    var friendId=req.params.id;
    listeAchatModel.find({'sharedWith.friendId':friendId},function (err, liste) {
        if (err) res.send(err);
        res.send(liste);

    });
});



//PUT to update ListAchat wihth a SharedWith and yetShared
router.put('/listeAchats/share/:id',function(req,res){
    //console.log('req.body of sharedSubmit',req.body);
    var listAchatId=req.params.id;
    var friend={
        friendId:req.body.friend.friendId,
        friend_name:req.body.friend.friend_name
    }

    listeAchatModel.findByIdAndUpdate(listAchatId,{sharedWith:friend,yetShared:true},function(err,liste){
        if(err){
            res.send(err);
        }
        res.send(liste);
    })
})

router.delete('/listeAchats/:listeAchatsId', function (req, res) {

    listeAchatModel.findByIdAndRemove(req.params.listeAchatsId, function (err, docs) {
        if (err) return console.log(err);
        res.send('ListeAchat removed Successufully :' + req.params);
    });
});


router.put('/listeAchats/:mListID', function (req, res) {
    var mlistId = req.params.mListID;
    var updatedList = req.body;
    console.log('update list :', updatedList);
    listeAchatModel.findOneAndUpdate({ _id: mlistId }, updatedList.list, function (err, liste) {
        if (err) {
            res.send(err);
        }
        res.send('ListeAchat successfully updated');
    });
})

module.exports = router;
