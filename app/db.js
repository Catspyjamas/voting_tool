const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const env = process.env.NODE_ENV || "development";

//mongo is named here to match the docker compose service
async function initDatabase() {
  await mongoose.connect("mongodb://mongo:27017/voting-tool-" + env, {
    useNewUrlParser: true
  });
}

mongoose.Promise = global.Promise;

// TODO : check if I can remove connection export
module.exports = {
  connection: mongoose.connection,
  initDatabase
};
