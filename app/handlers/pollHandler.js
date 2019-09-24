const Poll = require("../models/Poll");

exports.findPoll = async (req, res, next) => {
  const poll = await Poll.findOne({ _id: req.params.pollId }).populate("votes");

  if (!poll) {
    throw new Error(`Unknown poll with id ${req.params.pollId}`);
  }
  res.locals.poll = poll;
  next();
};
