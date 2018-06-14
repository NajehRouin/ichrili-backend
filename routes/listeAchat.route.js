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

router.delete('/listeAchats/:listeAchatsId', function (req, res) {
    
    listeAchatModel.findByIdAndRemove(req.params.listeAchatsId, (err, docs) => {
        if (err) return console.log(err);
        res.send('ListeAchat removed Successufully :' + req.params);
    });
});

router.put('/listeAchats/:listeAchatsId', (req, res) => {
    var listeId = req.params.listeAchatsId;
    var listeA = req.body;
    console.log(listeA);
    listeAchatModel.findOneAndUpdate({
        _id: req.params.listeAchatsId
    }, req.body, function (err, listeA) {
        res.send('ListeAchat successfully updated');
    });
})

module.exports = router;
