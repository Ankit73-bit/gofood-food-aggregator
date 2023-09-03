const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name."],
  },
  email: {
    type: String,
    required: [true],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide your email."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
