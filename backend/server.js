const mongoose = require("mongoose");
const dotenv = require("dotenv");
const foodItems = require("./models/foodItemSchema");
const foodCetegory = require("./models/foodCategorySchema");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");
// const foodItemSchema = require("./models/foodItemSchema");
const catchAsync = require("./utils/catchAsync");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const fetchData = catchAsync(async () => {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB connection successful.");

  const foodItemsData = await foodItems.find({});
  const foodCetegoryData = await foodCetegory.find({});

  global.fooditems = foodItemsData;
  global.foodcategories = foodCetegoryData;
  // console.log(global.fooditems);
  // console.log("Fetch data: ", foodItems);
  // console.log("data fetched successfully.");
});

fetchData();

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
