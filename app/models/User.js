const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  token: String
});

module.exports = mongoose.model("User", userSchema);
