const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Tip = mongoose.model("Tip");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.get('/', function(req, res) {
  Tip.findOneRandom(function(err, randtip) {
    if(err) {
      return res.json({error: "got no tip"});
    }
    res.json({tip: randtip.tip});
  });
});

router.get('/hey', requireLogin, function(req, res) {
  res.send('hey dude-_-');
});

router.post('/signup', function(req, res) {
  const {name, email, password} = req.body;
  if(!name || !email || !password) {
    return res.status(422).json({error: "fill all fields"});
  }
  User.findOne({email:email}, function(err, result) {
    if(!err) {
      if(result) {
        return res.status(422).json({error: "account already exists"});
      }
      User.findOne({name:name}, function(err1, result1) {
        if(!err1) {
          if(result1) {
            return res.status(422).json({error: "somebody has that username"});
          }
          //finally! new user to sign up
          bcrypt.hash(password, 12)
            .then(function(hashedpass) {
              const user = new User({
                email: email,
                password: hashedpass,
                name: name,
                url: url
              });
              user.save()
                .then(function(user1) {
                  res.json({message: "account created!"});
                });
            });
          //signed up!
        }
      });
    }
  });
});

router.post('/signin', function(req, res) {
  const {name, password} = req.body;
  if(!name || !password) {
    return res.status(422).json({error: "fill all fields"});
  }
  User.findOne({name:name}, function(err, account) {
    if(!err) {
      if(!account) {
        return res.status(422).json({error: "wrong username/password"});
      }
      bcrypt.compare(password, account.password)
        .then(function(isMatch) {
          if(!isMatch) {
            return res.json({error: "wrong username/password"});
          }
          //sending jwt token as user is logged in
          const token = jwt.sign({_id: account._id}, JWT_SECRET);
          res.json({token: token, user: account});
          //res.json({message: "logged in"});
        });
    }
  });
});
module.exports = router;
