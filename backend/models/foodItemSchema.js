const mongoose = require("mongoose");

const optionsSchema = new mongoose.Schema({
  half: Number,
  full: Number,
  regular: Number,
  medium: Number,
  large: Number,
  _id: false,
});

const foodItemsSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    require: [true, "Must have a category name"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    require: [true, "Must have a food name"],
  },
  img: String,
  options: [optionsSchema],
  description: String,
});

const FoodItems = mongoose.model("FoodItems", foodItemsSchema);

module.exports = FoodItems;
