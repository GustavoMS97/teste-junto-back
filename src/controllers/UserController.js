const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authConfig = require("../config/auth.json");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    delete user.password;
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server could not register user." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({ error: "User not found." });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }
    user.password = undefined;
    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server could not log user in." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server could not find user." });
  }
});

module.exports = app => app.use("/user", router);
