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
  score:{
    type: Number,
    default:0
  },
  url: {
    type: String,
    default: "./profile-default-icon.png"
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
  }],
  pinnedpost: [{
    type: ObjectId,
    ref: "Post"
  }],
 response:{
    type:Number,
    default:0
  },
  allowAccess:{
    type:Number,
    default:1
  }
});

mongoose.model("User", UserSchema);
