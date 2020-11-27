const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Plant = mongoose.model("Plant");
const requireLogin = require('../middleware/requireLogin');
const requireLogin2 = require('../middleware/requireLogin2');

router.get("/user", requireLogin, function(req, res) {
  User.findById(req.body.id)
    .select("-password")
    .populate({
      path: 'followers',
      populate: { path: 'followers' }
    })
    .populate({
      path: 'following',
      populate: { path: 'following' }
    })
    .then(function(user) {
      Plant.find({owner: user._id}, function(err, plants) {
        if(err) {
          return res.status(422).json({error: "plants not found"});
        }
        res.json({user:user, plants:plants});
      });
    })
    .catch(function(err) {
      return res.status(404).json({error: "user not found"});
    });
});

router.get("/profile", requireLogin2, function(req, res) {
  res.json({user: req.user});
});

router.post("/updatepic", requireLogin, function(req, res) {
  User.findByIdAndUpdate(req.user._id, {
    url: req.body.url
    }, {new: true})
    .then(function(result) {
      res.json({user: result});
    })
    .catch(function(error) {
      res.json({error: "error updating pic"});
    });
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

router.post("/search", requireLogin, function(req, res) {
  const pattern = new RegExp("^"+ req.body.query);
  User.find({name: {$regex: pattern},
              _id: {$nin: req.user.following}
            })
    .then(function(user) {
      res.json({user: user});
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
