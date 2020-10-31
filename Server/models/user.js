const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  url: {
    type: String,
    default: ".../client/public/placeholder.png"
  },
  followers: [{
    type: ObjectId,
    ref: "User"
  }],
  following: [{
    type: ObjectId,
    ref: "User"
  }],
  numplants: {
    type: Number,
    default: 0
  },
  contest: [{
    type: ObjectId,
    ref: "Contest"
  }]
});

mongoose.model("User", UserSchema);
