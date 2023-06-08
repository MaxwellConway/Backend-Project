const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");

const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const LocalStrategy = require("passport-local").Strategy;

function authenticate(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
}

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("./home/home.ejs");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
