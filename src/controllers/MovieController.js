const express = require("express");
const User = require("../models/User");
const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).populate([
      "favoriteMovies"
    ]);
    return res.status(200).send(user.favoriteMovies);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Server could not get user favorites." });
  }
});

router.post("/favorites", authMiddleware, async (req, res) => {
  try {
    const { title, referenceId } = req.body;
    let movie = await Movie.findOne({ referenceId });
    if (!movie) {
      movie = await Movie.create({ title, referenceId });
    }
    await User.findByIdAndUpdate(req.userId, {
      $push: { favoriteMovies: movie }
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server could not create movie." });
  }
});

module.exports = app => app.use("/movie", router);
