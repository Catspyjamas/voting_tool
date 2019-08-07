const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";

mongoose.connect("mongodb://127.0.0.1:27017/voting-tool-" + env, {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

module.exports = {
  connection: mongoose.connection
};
