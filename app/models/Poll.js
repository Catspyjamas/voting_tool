const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  start: { type: Date },
  end: { type: Date },
  description: String,
  options: [{ title: String, description: String }],
  votes: [{ type: Schema.Types.ObjectId, ref: "Vote", required: true }],
  status: {
    type: String,
    enum: ["OPEN", "DRAFT", "CLOSED"]
  }
});

module.exports = mongoose.model("Poll", pollSchema);
