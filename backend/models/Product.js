const mongoose = require("mongoose");

module.exports = mongoose.model("Product", new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: String, enum: ["tee", "hoodie"] },
  variants: [{
    color: String,
    sizes: { S:Number, M:Number, L:Number, XL:Number, XXL:Number }
  }],
  createdAt: { type: Date, default: Date.now }
}));
