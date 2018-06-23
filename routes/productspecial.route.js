var express = require('express');
var router = express.Router();
var produitSpecialModel=require('../schemas/productspecial-schemas');

router.post('/productSpecials', (req, res) => {
   
    var item = {
        label: req.body.label,
        description: req.body.description,
        BudgetMin: req.body.BudgetMin,
        BudgetMax: req.body.BudgetMax
    };
    produitSpecialModel.collection.insertOne(item, function (err, result) {
        console.log("1 record inserted");
    });
});

router.get('/productSpecials', (req, res) => {
    produitSpecialModel.find(function (err, produitSpecial) {
        if (err) res.send(err);
        res.send(produitSpecial);

    });
});

router.delete('/productSpecials/:productspeId', function (req, res) {
    //console.log('product deleted : ' + req.params.productId);
    produitSpecialModel.findByIdAndRemove(req.params.productspeId, function(err, docs)  {
        if (err) return console.log(err);
        res.send('Product removed Successufully :' + req.params);
    });
});

router.put('/productSpecials/:productspeId', function(req, res)  {
    var produitspeId = req.params.productspeId;
    var produitSpecial = req.body;
    console.log(produitSpecial);
    produitSpecialModel.findOneAndUpdate({
        _id: req.params.productspeId
    }, req.body, function (err, produitSpecial) {
        res.send('produit successfully updated');
    });
})

module.exports = router;