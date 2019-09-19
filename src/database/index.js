const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://gustavoms97:Gu4525214@cluster0-gvhbx.mongodb.net/junto-backend?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

module.exports = mongoose;
