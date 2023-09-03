const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    require: [true, "Must have a category name"],
    unique: true,
    trim: true,
  },
});

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);

module.exports = FoodCategory;
