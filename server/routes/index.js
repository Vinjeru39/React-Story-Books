const express = require("express");
const router = express.Router();
const { ensureGuest } = require("../middleware/auth");

module.exports = router;

//This file isn't doing anything right now. I think I might delete it

router.get("/", ensureGuest, (req, res) => {
  return res.redirect("http://localhost:3000");
});

module.exports = router;
