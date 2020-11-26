const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const IPlant = mongoose.model("IPlant")
const requireLogin = require('../middleware/requireLogin')

router.get('/plantinfo', function(req, res) {
  const pattern = new RegExp("^"+ req.body.query);
  IPlant.find({
    name: {$regex: pattern}
  })
    .then(function(result) {
      return res.json({result});
    })
    .catch(function(err) {
      return res.status(422).json({error: "plants not found"});
    });
});

module.exports = router
