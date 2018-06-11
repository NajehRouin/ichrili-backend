var express = require('express');
var router = express.Router();
var meslistesModel=require('../schemas/meslistes-schemas');

router.post('/meslistes', (req, res) => {
   
    var item = {
        libelle: req.body.libelle,
        date: req.body.date,
        shared: req.body.shared,
        status: req.body.status
    };
    meslistesModel.collection.insertOne(item, function (err, result) {
        console.log("1 record inserted");
    });
});

router.get('/meslistes', (req, res) => {
    meslistesModel.find(function (err, meslistes) {
        if (err) res.send(err);
        res.send(meslistes);

    });
});

router.delete('/meslistes/:meslistesId', function (req, res) {
    
    meslistesModel.findByIdAndRemove(req.params.meslistesId, (err, docs) => {
        if (err) return console.log(err);
        res.send('meslistes removed Successufully :' + req.params)
    });
});
router.put('/meslistes/:meslistesId', (req, res) => {
    var meslisteId = req.params.meslistesId;
    var meslist = req.body;
    console.log(meslist);
    meslistesModel.findOneAndUpdate({
        _id: req.params.meslistesId
    }, req.body, function (err, meslist) {
        res.send('meslist successfully updated');
    });
})

module.exports = router;