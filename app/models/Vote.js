const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ranking: [String]
});

module.exports = mongoose.model("Vote", voteSchema);
