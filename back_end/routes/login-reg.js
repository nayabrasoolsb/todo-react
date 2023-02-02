const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const secret = "APITODO";

router.post(
  "/register",
  body("password").isLength({ min: 8, max: 20 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "failed",
          errors: errors.array(),
        });
      }
      const { username, password } = req.body;
      let user = await User.findOne({ username });
      console.log(user)
      if (user) {
        return res.status(401).json({
          status: "failed",
          messege: "username already registered",
        });
      }
      bcrypt.hash(password, 14, async (err, hash) => {
        if (err) {
          return res.status(403).json({
            status: "failed",
          });
        }
        user = await User.create({
          username,
          password: hash,
        });
        return res.status(200).json({
          status: "success",
          user,
        });
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        messege: error.messege,
      });
    }
  },
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        messege: "cannot find the username",
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          messege: "server side error",
        });
      }
      if (!result) {
        return res.status(401).json({
          status: "failed",
          messege: "invalid credentials!!, please check your password",
        });
      }
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user._id,
        },
        secret,
      );
      res.status(200).json({
        status: "success",
        token,
        user,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

module.exports = router;
