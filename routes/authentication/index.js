const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const authenticate = require("../../passport");

const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const { where } = require("sequelize");

router.get("/", (req, res) => {
  res.render("./login/login.ejs");
});

router.post("/login", authenticate, (req, res) => {
  // passport stuff
  //const { email, password } = req.body;
  //if (!email) {
  //  res.status(400).send("Please include an email");
  //  return;
  //}
  //if (!password) {
  //  res.status(400).send("Please include a password");
  //  return;
  //}
  //const userToFind = await Users.findOne({
  //  where: {
  //    email: email,
  //  },
  //});
  ////compare the user password from req.body with the corresponding password in the database
  ////this returns true if the passwords match
  //if (!passwordMatch) {
  //  res.status(403).send("Incorrect password");
  //  return;
  //}
  //
  //console.log(passwordMatch);
  res.redirect("/home");
});

router.get("/signup", (req, res) => {
  // passport stuff
  res.render("./signup/signup.ejs");
});

router.post("/signup", async (req, res) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const signUp = await Users.create({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });
  const { email, password, username } = req.body;
  if (!email) {
    res.status(400).send("Please include an email");
    return;
  }
  if (!password) {
    res.status(400).send("Please include a password");
    return;
  }
  if (!username) {
    res.status(400).send("Please include a username");
    return;
  }
  // user create code goes here
  // bcrypt goes here too
  // redirect them to the login page
  res.redirect("/login");
});

module.exports = router;
