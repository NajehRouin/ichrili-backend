var express = require('express');
var router = express.Router();
var marketModel=require('../schemas/market-schemas');

router.post('/markets', (req, res) => {
   
    var item = {
        market_name: req.body.market_name,
        Adresse: req.body.Adresse,
        ville: req.body.ville,
        code: req.body.code
       
    };
    marketModel.collection.insertOne(item, function (err, result) {
        console.log("market  inserted");
    })
})

router.get('/markets', (req, res) => {
    marketModel.find(function (err, markets) {
        if (err) res.send(err);
        res.send(markets);

    })
})

router.delete('/markets/:marketId', function (req, res) {
    
    marketModel.findByIdAndRemove(req.params.marketId, (err, docs) => {
        if (err) return console.log(err);
        res.send('market removed Successufully :' + req.params)
    })
})

router.put('/markets/:marketId', (req, res) => {
    var marketId = req.params.marketId;
    var market = req.body;
    console.log(market);
    marketModel.findOneAndUpdate({
        _id: req.params.marketId
    }, req.body, function (err, market) {
        res.send('market successfully updated');
    });
})

module.exports = router;