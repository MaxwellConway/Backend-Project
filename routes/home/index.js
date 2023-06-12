const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");
const { Concerts } = require("../../models");
const { linkedUserConcerts } = require("../../models");
const { Op } = require("sequelize");

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

router.get("/", cookieJwtAuth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const userData = await fetchUserData(userId);

    const linkedConcerts = await linkedUserConcerts.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Concerts,
        },
      ],
    });

    const concertIds = linkedConcerts.map(
      (linkedConcert) => linkedConcert.concertId
    );

    const otherLinkedConcerts = await linkedUserConcerts.findAll({
      where: {
        concertId: concertIds,
        userId: {
          [Op.ne]: userId,
        },
      },
      include: [
        {
          model: Users,
        },
      ],
    });

    const concerts = linkedConcerts.map((linkedConcert) => {
      const concert = linkedConcert.Concert;
      const associatedUsernames = otherLinkedConcerts
        .filter(
          (otherLinkedConcert) =>
            otherLinkedConcert.concertId === linkedConcert.concertId
        )
        .map((otherLinkedConcert) => otherLinkedConcert.User.username);
      return {
        concert,
        associatedUsernames,
      };
    });

    res.render("home/home", {
      concerts,
      userData: userData,
      userId,
      linkedConcerts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
