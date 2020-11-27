const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const IPlantSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  yieldTime: {
    type: String,
    require: true
  },
  soilType: {
    type: Number,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  type: {
    type: Number,
    require: true
  },
  temp: {
    type: Number,
    require: true
  },
  water: {
    type: Number,
    require: true
  },
  manure: {
    type: Number,
    require: true
  },
  pesticide: {
    type: Number,
    require: true
  },
  tip: {
    type: String,
    require: true
  },
  companions: [{
    type: String,
    require: true
  }],
});

mongoose.model("IPlant", IPlantSchema);
