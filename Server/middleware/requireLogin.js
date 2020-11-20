const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = function(req, res, next) {
    const {authorization} = req.headers
    //authorization will be like 'Bearer <jwtoken>'
    if(!authorization) {
      return res.status(401).json({error: "must log in"});
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET, function(err, payload) {
      if(err) {
        return res.status(401).json({error: "must log in"});
      }
      const {_id} = payload
      User.findById(_id)
        .then(function(userData) {
          req.user = userData;
          next();
        });

    });
};
