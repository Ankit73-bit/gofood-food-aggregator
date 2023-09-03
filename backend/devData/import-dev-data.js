const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const FoodItems = require("../models/foodItemSchema");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

// Read Json File
const foodItems = JSON.parse(
  fs.readFileSync(`${__dirname}/foodData2.json`, "utf-8")
);

const importData = async () => {
  try {
    await FoodItems.create(foodItems);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collections(DB)
const deleteData = async () => {
  try {
    await FoodItems.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);

// node dev-data/data/import-dev-data --delete || --import
