const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");
const { Concerts } = require("../../models");
const { linkedUserConcerts } = require("../../models");

const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const jwtDecode = require("jwt-decode");

const fetchUserData = async (userId) => {
  try {
    // Retrieve the user data from the database based on the userId
    const userData = await Users.findOne({ where: { id: userId } });

    return userData;
  } catch (error) {
    console.log("Error fetching user data:", error);
    throw error;
  }
};

//CRUD

router.get("/get_linkedUserConcerts", async (req, res) => {
  const concerts = await linkedUserConcerts.findAll();
  res.send(concerts);
});

router.post("/new_linkedUserConcert", async (req, res) => {
  const { concertId, userId } = req.body;
  const newLinkedUserConcert = await linkedUserConcerts.create({
    concertId: concertId,
    userId: userId,
  });
  res.send(newLinkedUserConcert);
});

router.put("/update_linkedUserConcerts/:id", async (req, res) => {
  const { id } = req.params;
  const { newConcertId, newUserId } = req.body;
  const user = await Users.update(
    {
      concertId: `${newConcertId}`,
      userId: `${newUserId}`,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.send("Success");
});

router.post("/delete_linkedUserConcerts/", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const concertId = req.body.concertId;

    // Delete the entry from the linkedUserConcerts table
    await linkedUserConcerts.destroy({
      where: {
        userId: userId,
        concertId: concertId,
      },
    });

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
