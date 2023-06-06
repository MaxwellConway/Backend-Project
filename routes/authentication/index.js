const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");

const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const LocalStrategy = require("passport-local").Strategy;

function logRequest(req, res, next) {
  console.log(`[$new Date().ISOString]`);
}

router.get("/login", (req, res) => {
  res.render("login/login");
});

router.post("/login", (req, res) => {
  // passport stuff
  console.log(req.body);
  res.render("login/login");
});

router.get("/signup", (req, res) => {
  // passport stuff
  res.render("signup/signup");
});

router.post("/signup", async (req, res) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const signUp = await Users.create({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });
  if (signUp.error) {
    res.status(400).send("There was an issue");
    return;
  }
  // user create code goes here
  // bcrypt goes here too
  // redirect them to the login page
  res.redirect("/login");
});

module.exports = router;
