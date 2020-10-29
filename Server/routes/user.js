const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const requireLogin = require('../middleware/requireLogin');

router.get("/profile", requireLogin, function(req, res) {
  res.json({user: req.user});
});

router.put("/follow", requireLogin, function(req,res) {
  User.findByIdAndUpdate(req.body.followId, {
    $push: {followers: req.user._id}
  }, {new: true}, function(err, result) {
    if(err) {
        return res.status(422).json({error: err});
    }
    User.findByIdAndUpdate(req.user._id, {
      $push: {following: req.body.followId}
    }, {new: true})
      .then(function(result1) {
          res.json({result: result});
      })
      .catch(function(err1) {
        res.status(422).json({error: err1});
      });
  });
});

router.post("/search", function(req, res) {
  const pattern = new RegExp("^"+ req.body.query);
  User.find({name: {$regex: pattern}})
    .then(function(user) {
      res.json({user: user});
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
