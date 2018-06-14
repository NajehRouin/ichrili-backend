var express = require('express');
var router = express.Router();
var userModel=require('../schemas/users-schemas');

router.post('/users', (req, res) => {
    var item = {
        user_name: req.body.user_name,
        password: req.body.password,
        avatar_url: req.body.avatar_url,
        gender:req.body.gender,
        region:req.body.region,
        email:req.body.email,
        numtel:req.body.numtel
    };
    userModel.collection.insertOne(item, function (err, result) {
        console.log("User inserted Successfully");
        res.send(item);
    })
})

router.get('/users', (req, res) => {
    userModel.find(function (err, users) {
        if (err) res.send(err);
        res.send(users);

    })
})
router.get('/users/:id', (req, res) => {
    var userId=req.params.id;
    userModel.findById({_id:userId},function (err, user) {
        if (err) res.send(err);
        res.send(user);
    })
})


router.delete('/users/:userId', function (req, res) {
    //console.log('user deleted : ' + req.params.productId);
    userModel.findByIdAndRemove(req.params.userId, (err, docs) => {
        if (err) return console.log(err);
        res.send('User removed Successufully :' + req.params)
    })
})

router.put('/users/:userId', (req, res) => {
    var userId = req.params.userId;
    var user = req.body;
    console.log(user);
    userModel.findOneAndUpdate({
        _id: req.params.userId
    }, req.body, function (err, user) {
        res.send('user successfully updated');
    });
})

//Authentication
router.post('/users/authenticate', (req, res) => {
   // var deferred = Q.defer();
    var user_name=req.body.user_name;
    var password=req.body.password;
    //console.log(user_name,'  ',password);
    userModel.findOne({
        user_name: user_name
    }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && (password===user.password)) {
            // authentication successful
      /*      deferred.resolve({
                _id: user._id,
                user_name: user.user_name,
                password:user.password,
                avatar_url: user.avatar_url,
                gender: user.gender,
                region: user.region,
            });*/
            res.send({err:"Login Succeed",message:user});
        } else {
            // authentication failed
    //        deferred.resolve();
            res.send({err:"Login Failed",message:'Autenticated Failed Try again'})
        }
    });

  //  return deferred.promise;
});



router.get('/users/foreigners/:id',(req,res)=>{
        var userId=req.params.id;
        userModel.find({_id:{$ne:userId}},(err,users)=>{
            if(err){
                res.send(err);
            }
            res.send(users);
        });


});
router.get ('/users/recived/:id',(req,res)=>{
    var userId=req.params.id;
    userModel.find({_id:userId},(err,users)=>{
        if(err){
            res.send(err);
        }
        res.send(users);
    });


});

module.exports = router;