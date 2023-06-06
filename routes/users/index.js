const express = require("express");
const router = express.Router();
const ejs = require("ejs");

const { Users } = require("../../models");

//CRUD

router.get("/get_users", async (req, res) => {
  const users = await Users.findAll();
  console.log(users);
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

router.put("/update_user/:id", async (req, res) => {
  const { id } = req.params;
  const { newEmail, newUsername, newPassword } = req.body;
  const user = await Users.update(
    {
      email: `${newEmail}`,
      username: `${newUsername}`,
      password: `${newPassword}`,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.send("Success");
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
