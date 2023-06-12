const express = require("express");
const router = express.Router();
const ejs = require("ejs");

const { Users } = require("../../models");

const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const jwtDecode = require("jwt-decode");

const fetchUserData = async (userId) => {
  try {
    const userData = await Users.findOne({ where: { id: userId } });

    return userData;
  } catch (error) {
    console.log("Error fetching user data:", error);
    throw error;
  }
};

router.get("/get_users", async (req, res) => {
  const users = await Users.findAll();
  res.send(users);
});

router.post("/new_user", async (req, res) => {
  const { email, username, password } = req.body;
  const newUser = await Users.create({
    email: email,
    username: username,
    password: password,
  });
  res.send(newUser);
});

router.post("/update_username", cookieJwtAuth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const newUsername = req.body.newUsername;

    await Users.update({ username: newUsername }, { where: { id: userId } });

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete_users/:id", async (req, res) => {
  const { id } = req.params;
  const concert = await Users.destroy({
    where: {
      id: id,
    },
  });
  res.send("Success");
});

module.exports = router;
