const express = require("express");
const router = express.Router();
const ejs = require("ejs");

const { Concerts } = require("../../models");

//CRUD

router.get("/get_concerts", async (req, res) => {
  const concerts = await Concerts.findAll();
  res.send(concerts);
});

router.post("/new_concert", async (req, res) => {
  const { concertCode, name, date, url } = req.body;
  const newConcert = await Concerts.create({
    concertCode: concertCode,
    name: name,
    date: date,
    url: url,
  });
  res.send(newConcert);
});

router.put("/update_concert/:id", async (req, res) => {
  const { id } = req.params;
  const { newConcertCode, newName, newDate, newUrl } = req.body;
  const user = await Users.update(
    {
      concertCode: `${newConcertCode}`,
      name: `${newName}`,
      date: `${newDate}`,
      url: `${newUrl}`,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.send("Success");
});

router.delete("/delete_concerts/:id", async (req, res) => {
  const { id } = req.params;
  const concert = await Concerts.destroy({
    where: {
      id: id,
    },
  });
  res.send("Success");
});

module.exports = router;
