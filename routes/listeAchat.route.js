var express = require('express');
var router = express.Router();
var listeAchatModel=require('../schemas/listeAchat-schemas');

router.post('/listeAchats', (req, res) => {
   
    var list={
        label:req.body.label,
        date_creation:req.body.date_creation,
        owner:req.body.owner,
        items:req.body.items
    }
    listeAchatModel.insertMany(list,(err,done)=>{
        if(err){
            res.send({err:err});
        }
        res.send("1 List successufully inserted ");
    })
})

router.get('/listeAchats', (req, res) => {
    listeAchatModel.find(function (err, liste) {
        if (err) res.send(err);
        res.send(liste);

    })
})

router.get('/listeAchats/owner/:id', function(req, res) {
    var ownerId=req.params.id;
    listeAchatModel.find({'owner.id':ownerId},function (err, liste) {
        if (err) res.send(err);
        console.log("oner list",liste);
        res.send(liste);
        
    })
})

router.get('/listeAchats/friend/:id', (req, res) => {
    listeAchatModel.find(function (err, liste) {
        if (err) res.send(err);
        res.send(liste);

    })
})

router.delete('/listeAchats/:listeAchatsId', function (req, res) {
    
    listeAchatModel.findByIdAndRemove(req.params.listeAchatsId, (err, docs) => {
        if (err) return console.log(err);
        res.send('ListeAchat removed Successufully :' + req.params);
    });
});

router.put('/listeAchats/:mListID', (req, res) => {
    var mlistId = req.params.mListID;
    var updatedList= req.body;
    console.log('update list :',updatedList);
    listeAchatModel.findOneAndUpdate({_id: mlistId}, updatedList.list, function (err, liste) {
        if(err){
            res.send(err);
        }
        res.send('ListeAchat successfully updated');
    });
})

module.exports = router;
