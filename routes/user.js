const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { auth } = require("../middleware/auth");

//Actual Routes
router.get("/getProfile", auth, (req, res) => {
  res.send(req.user);
});

//Get all user
router.get("/", (req, res) => {
  User.find().then((doc) => {
    res.send(doc);
  });
});

module.exports = router;
