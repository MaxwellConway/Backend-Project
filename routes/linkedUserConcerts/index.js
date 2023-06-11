const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { Users } = require("../../models");
const { Concerts } = require("../../models");
const { linkedUserConcerts } = require("../../models");

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

router.delete("/delete_linkedUserConcerts/:id", async (req, res) => {
  const { id } = req.params;
  const linkedUserConcert = await linkedUserConcerts.destroy({
    where: {
      id: id,
    },
  });
  res.send("Success");
});

module.exports = router;
