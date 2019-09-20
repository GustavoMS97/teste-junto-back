const mongoose = require("../database");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  referenceId: {
    type: Number,
    required: true,
    unique: true
  }
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
