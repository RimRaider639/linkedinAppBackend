const express = require("express");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await User.find({ email });
    if (found.length)
      res.send({ message: "User already exists, please login" });
    const hashed = bcrypt.hashSync(password, 5);
    const newUser = new User({ ...req.body, password: hashed });
    await newUser.save();
    res.send({ message: "User successfully registered" });
  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const found = await User.find({ email });
    if (!found.length) res.send({ message: "Wrong email address" });
    const match = await bcrypt.compare(password, found[0].password);
    if (!match) req.send({ message: "Wrong password" });
    const token = jwt.sign({ _id: found[0]._id }, process.env.KEY);
    res.send({ message: "User successfully logged in", token });
  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
});

module.exports = { userRouter };
