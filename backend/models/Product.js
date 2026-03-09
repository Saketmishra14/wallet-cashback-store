const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  rating: Number,
  category: String,
  image: String
});

module.exports = mongoose.model("Product", productSchema);