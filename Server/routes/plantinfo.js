const express = require('express')
const metaphone = require('metaphone')
const stemmer = require('stemmer')
const router = express.Router()
const mongoose = require('mongoose')
const IPlant = mongoose.model('IPlant')
const Post = mongoose.model('Post')
const {ObjectId} = mongoose.Schema.Types
const requireLogin = require('../middleware/requireLogin')

router.post('/test', function(req,res) {
  const s = metaphone(stemmer('pranathi'))
  if(s === metaphone(stemmer(req.body.word))) {
    res.json({res:"matched"})
  }
  else {
    res.json({res: "not matched"})
  }
})

router.post('/searchplant', function(req, res) {
  const pattern = new RegExp("^"+ req.body.query,'i');
  IPlant.find({
    name: {$regex: pattern}
  })
    .select("_id name type url")
    .then(function(result) {
      return res.json({result});
    })
    .catch(function(err) {
      return res.status(422).json({error: "plants not found"});
    });
});

/*
Vegetables(0)
Flowers(1)
Fruits(2)
Creeper(3)
Shrubs(4)
Ornamental(5)\
Herbs(6)
*/

/*
1: 1-2 gallons
2: 3-5 gallons
3: 5-10 gallons
4: 10-15 gallons
5: 15 and above
*/

router.post('/plantinfo', function(req, res) {
  //const pattern = new RegExp("^"+ req.body.name,'i');
  //console.log(name);
  IPlant.findOne({
    name: req.body.name
  })
    .then(function(plant) {
      var type = "";
      var i;
      for(i of plant.type )
        switch(i) {
          case 0: type += "Vegetable "; break;
          case 1: type += "Flower "; break;
          case 2: type += "Fruit "; break;
          case 3: type += "Creeper "; break;
          case 4: type += "Shrub "; break;
          case 5: type += "Ornamental "; break;
          case 6: type += "Herb "; break;
        }
      var comp = "";
      for(i of plant.companions)
        comp += i + " ";
      var water = "";
      switch(plant.water) {
        case 1: water = "1-2 gallons/week"; break;
        case 2: water = "3-5 gallons/week"; break;
        case 3: water = "5-10 gallons/week"; break;
        case 4: water = "10-15 gallons/week"; break;
        case 5: water = ">15 gallons/week"; break;
      }
      var temp = String(plant.temp-3) + " to " + String(plant.temp+3) + " degrees Celsius";
      //should do ranges for manure and pesticide also
      res.json({
        name: plant.name,
        yieldTime: plant.yieldTime,
        soilType: plant.soilType,
        url: plant.url,
        type: type,
        temp: temp,
        water: water,
        manure: plant.manure, //this shud change
        maintanance: plant.maintenance, //this shud change
        tip: plant.tip,
        companions: comp
      });
    })
    .catch(function(err) {
      return res.status(422).json({error: err});
    });
});

router.post('/plantposts', function(req,res) {
  const tag = req.body.name;
  const regex = new RegExp(tag, 'i');
  Post.find({
    tag: {$regex: regex}
  })
    .populate('postedBy', 'name url')
    .populate('comments.postedBy', 'name url')
    .then(function(posts) {
      res.json({posts: posts});
    })
    .catch(function(err) {
      return res.status(422).json({error: "posts not found"});
    });
});

module.exports = router
