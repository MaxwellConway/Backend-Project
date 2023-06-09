const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");
const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");

router.get("/", cookieJwtAuth, async (req, res) => {
  res.render("./searchResults/searchResults.ejs");
});
