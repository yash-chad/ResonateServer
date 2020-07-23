const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { auth } = require("../middleware/auth");

//Add expense
router.post("/add", auth, (req, res) => {
  const expense = req.body;
  req.user.expense.push(expense);
  req.user.save();
  res.send(req.user);
});

// Delete expense
router.get("/:id", auth, (req, res) => {
  req.user.expense.pull({ _id: req.params.id });
  req.user.save();
  res.send("Deleted");
});

//Get all expense
router.get("/", auth, (req, res) => {
  res.send(req.user.expense);
});

module.exports = router;
