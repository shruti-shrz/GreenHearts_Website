const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: String,
    require: true
  },
  owner: {
    type: ObjectId,
    ref: "User"
  }
});

mongoose.model("Plant", PlantSchema);
