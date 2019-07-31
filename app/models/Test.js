const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a test name!"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Test", testSchema);
