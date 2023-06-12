const express = require("express");
const router = express.Router();
const ejs = require("ejs");
// const authenticate = require("../../passport");
const { Users } = require("../../models");
const bcrypt = require(`bcrypt`);
const jwt = require("jsonwebtoken");
const cookieJwtAuth = require("../../middleware/cookieJwtAuth");

router.get("/", (req, res) => {
  res.render("./login/login.ejs");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check for missing email and password
  if (!email || !password) {
    res.status(400).send("Please include both email and password");
    return;
  }

  // Retrieve user from the database
  const user = await Users.findOne({ where: { email: email } });

  // Check if the user exists
  if (!user) {
    res.status(401).send("Invalid email or password");
    return;
  }

  // Verify the password
  const passwordMatch = await bcrypt.compare(password, user.password);

  // Check if the password is correct
  if (!passwordMatch) {
    res.status(401).send("Invalid email or password");
    return;
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, "secret");
  //const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds

  // Set the JWT token as a cookie
  res.cookie("token", token);

  res.redirect("/home");
});

router.post("/guest", async (req, res) => {
  try {
    // Create a new guest user in the Users table
    const guestUser = await Users.create({
      email: "Guest",
      username: "Guest",
      password: "", // Set an empty password for guest users
      // Add any other required fields for the guest user
    });

    const guestUserId = guestUser.id;

    // Generate a token for the guest user
    const token = jwt.sign({ guestUserId }, "secret");

    // Set the token as a cookie
    res.cookie("token", token);

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// router.post("/login", cookieJwtAuth, async (req, res) => {
//   const { email, password } = req.body;
//   const userToFind = await Users.findOne({
//     where: {
//       email: email,
//     },
//   });
//   if (!email) {
//     res.status(400).send("Please include an email");
//     return;
//   }
//   if (!password) {
//     res.status(400).send("Please include a password");
//     return;
//   }
//   res.redirect("/home");
// });

router.get("/signup", (req, res) => {
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
  res.redirect("/login");
});

module.exports = router;
