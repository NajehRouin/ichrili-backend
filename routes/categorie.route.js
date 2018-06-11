var express = require('express');
var router = express.Router();
var categorieModel=require('../schemas/categorie-schemas');

router.post('/categories', (req, res) => {
   
    var item = {
        categorieP: req.body.categorieP,
        rayon: req.body.rayon,
        
    };
    
    categorieModel.collection.insertOne(item, function (err, result) {
        console.log("1 record inserted");
    })
})

router.get('/categories', (req, res) => {
    categorieModel.find(function (err, categories) {
        if (err) res.send(err);
        res.send(categories);

    })
})

router.delete('/categories/:categorieId', function (req, res) {
    
    categorieModel.findByIdAndRemove(req.params.categorieId, (err, docs) => {
        if (err) return console.log(err);
        res.send('categorie removed Successufully :' + req.params)
    })
})

router.put('/categories/:categorieId', (req, res) => {
    var categorieId = req.params.categorieId;
    var categorie = req.body;
    console.log(categorie);
    categorieModel.findOneAndUpdate({
        _id: req.params.categorieId
    }, req.body, function (err, categorie) {
        res.send('categorie successfully updated');
    });
})

module.exports = router;