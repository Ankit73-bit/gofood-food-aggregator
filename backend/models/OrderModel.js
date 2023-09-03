const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide your email."],
  },
  orderData: {
    type: Array,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
