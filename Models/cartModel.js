// Cart Item Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({

  bookId: {
    type: Number,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
}, { timestamps: true}) 

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
