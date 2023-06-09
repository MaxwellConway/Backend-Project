const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");
const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const jwtDecode = require("jwt-decode");

const fetchUserData = async (userId) => {
  try {
    // Retrieve the user data from the database based on the userId
    const userData = await Users.findOne({ where: { id: userId } });
    console.log(userData);

    return userData;
  } catch (error) {
    console.log("Error fetching user data:", error);
    throw error;
  }
};

router.get("/", cookieJwtAuth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const userData = await fetchUserData(userId);
    res.render("./home/home.ejs", { userData: userData });
  } catch (error) {
    // Handle any errors that occur during the process
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/home", cookieJwtAuth, async (req, res) => {
  res.redirect("/searchResults");
});

router.post("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
