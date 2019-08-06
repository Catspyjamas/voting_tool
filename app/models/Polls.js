const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: "Please enter a poll name!"
  },
  date: { type: Date, default: Date.now },
  //!check if compatible with data from moment
  start: { type: Date },
  end: { type: Date },
  description: String,
  options: [{ id: String, title: String, description: String }],
  votes: [{ userId: String, ranking: Array }],
  status: {
    type: String,
    enum: ["OPEN", "DRAFT", "CLOSED"]
  }
});

module.exports = mongoose.model("Poll", pollSchema);
