const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../middleware/requireLogin')

router.get('/planttalk', requireLogin, function(req,res) {
  const {response, water, manure, weeds} = req.user;
  if(response === 0) {
    return res.json({error: "never answered questionnaire"});
  }
  const cur = new Date();
  waterdiff = Math.abs(cur.getTime() - water)/(1000 * 3600 * 24);
  manurediff = Math.abs(cur.getTime() - manure)/(1000 * 3600 * 24);
  weedsdiff = Math.abs(cur.getTime() - weeds)/(1000 * 3600 * 24);

//shud include weather related info also: sunny, cloudy, rainy
  return res.json({waterdiff, manurediff, weedsdiff});
});

module.exports = router
