const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
     // Reference to the Book model
    required: true,
  },
  bookName: {
    type: String,
    requried: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
