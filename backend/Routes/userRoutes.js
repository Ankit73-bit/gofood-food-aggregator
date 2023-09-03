const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/signup",
  body("email", "Invalid email.").isEmail(),
  body("password", "Invalid Password! minimum length must be 8").isLength({
    min: 8,
  }),
  catchAsync(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const setPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: setPassword,
      location: req.body.location,
    });
    res.json({
      status: "success",
    });
  })
);

router.post(
  "/login",
  body("email", "Invalid email.").isEmail(),
  body("password", "Invalid Password! minimum length must be 8").isLength({
    min: 8,
  }),
  catchAsync(async (req, res, next) => {
    let email = req.body.email;
    let userData = await User.findOne({ email });
    if (!userData) {
      // return next(new AppError("Invalid email or password!", 400));
      return res
        .status(400)
        .json({ errors: "Invalid email! Please try again." });
    }

    const pwdCompare = bcrypt.compare(req.body.password, userData.password);
    if (!pwdCompare) {
      // return next(new AppError("Invalid email or password!", 400));
      return res
        .status(400)
        .json({ errors: "Invalid password! Please try again" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({
      status: "success",
      authToken,
    });
  })
);

module.exports = router;
