const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Order = require("../models/OrderModel");
const router = express.Router();

router.post(
  "/orderData",
  catchAsync(async (req, res, next) => {
    let data = req.body.orderData;
    await data.splice(0, 0, { orderDate: req.body.orderDate });

    const eID = await Order.findOne({ email: req.body.email });
    if (eID === null) {
      try {
        await Order.create({
          email: req.body.email,
          orderData: [data],
        }).then(() => {
          res.json({
            status: "success",
          });
        });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { orderData: data } }
        ).then(() => {
          res.json({
            status: "success",
          });
        });
      } catch (err) {
        res.send(err.message);
      }
    }
  })
);

module.exports = router;
