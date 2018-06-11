var express = require('express');
var router = express.Router();
var listeAchatModel=require('../schemas/listeAchat-schemas');

router.post('/listeAchats', (req, res) => {
   
    var item = {
        produit: req.body.produit,
        market: req.body.market,
        qte: req.body.qte,
        prix: req.body.prix,
        totale: req.body.totale
    };
    listeAchatModel.collection.insertOne(item, function (err, result) {
        console.log("1 record inserted");
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
