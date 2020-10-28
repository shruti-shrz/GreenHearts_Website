const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Plant = mongoose.model("Plant");
const requireLogin = require('../middleware/requireLogin');

router.post("/addplant", requireLogin, function(req,res){
  const {name, url, date} = req.body;
  if(!name || !url || !date) {
    return res.status(422).json({error: "please enter all fields"});
  }
  req.user.password = undefined;
  const plant = new Plant({
    name: name,
    url: url,
    date: date,
    owner: req.user
  });
  plant.save()
    .then(function(result) {
      //const id=mongoose.Types.ObjectId(req.user._id);
      Plant.countDocuments({owner: req.user._id}, function(err, count) {
        if(err) {
          console.log(err);
        }
        else {
          User.findByIdAndUpdate(req.user._id, {
            numplants: count
          }, {new: true})
            .then(function(res1) {
                res.json({plant: result});
            });
        }
      });
    })
    .catch(function(err) {
      res.json({error: err});
    });

});

router.get('/myplants',requireLogin,function(req, res) {
  Plant.find({owner:req.user._id})
    .populate("owner", "_id name")
    .then(function(result) {
      res.json({plants: result});
    })
    .catch(function(err) {
      res.json({error: err});
    });
});

module.exports = router;
