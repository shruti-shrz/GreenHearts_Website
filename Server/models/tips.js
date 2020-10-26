const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const TipSchema = new mongoose.Schema({
  tip: String
});
TipSchema.plugin(random);

mongoose.model("Tip", TipSchema);
