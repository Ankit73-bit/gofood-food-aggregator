const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router.post(
  "/foodData",
  catchAsync(async (req, res, next) => {
    res.send([global.fooditems, global.foodcategories]);
  })
);

module.exports = router;
