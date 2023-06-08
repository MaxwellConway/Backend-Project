const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");
const authenticate = require("../../passport");

//router.get("/", ensureAuthenticated, (req, res) => {
//  res.render("./home/home.ejs");
//});

router.get("/", authenticate, async (req, res) => {
  try {
    // Fetch data from the database
    const data = await Users.linkedUserConcerts(); // Replace "Users" with your actual model name or database query

    // Render the EJS template and pass the data
    res.render("./home/home.ejs", { data }); // Pass the retrieved data as an object property
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
