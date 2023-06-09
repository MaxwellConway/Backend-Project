const express = require("express");
const router = express.Router();

const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");

router.get("/", cookieJwtAuth, async (req, res) => {
  res.render("./searchResults/searchResults.ejs");
});

module.exports = router;
