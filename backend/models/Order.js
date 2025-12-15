const mongoose = require("mongoose");

module.exports = mongoose.model("Order", new mongoose.Schema({
  items: Array,
  total: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
}));
