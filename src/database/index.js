const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL || "mongodb://mongodb0.example.com:27017/junto-backend",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

module.exports = mongoose;
