const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://GUSTAVOMS97:Gu4525214@cluster0-gvhbx.mongodb.net/junto-backend?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// mongodb://mongodb0.example.com:27017/junto-backend
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

module.exports = mongoose;
