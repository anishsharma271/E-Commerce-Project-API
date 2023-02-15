const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
  image: String,
  // date: { type: Date, default: Date.now },

  title: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require:true
  },

  discription: {
    type: String,
    require:true
  },
  rating: {
    type: String,
    require:true
  },
});
module.exports = new mongoose.model("products", user);
