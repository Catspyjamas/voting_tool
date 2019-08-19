const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {
  //check if user is authorized
  const user = res.locals.user;
  if (Array.isArray(req.body.votes) === true && req.body.votes.length > 0) {
    throw new Error("You cannot create a poll with votes.");
  }
  //delete _id from request so mongoose lets us save more instances of the same object
  delete req.body._id;
  const poll = await new Poll({ ...req.body, creator: user._id }).save();
  res.status(201);
  //201: for created
  res.json(poll);
};

exports.getPolls = async (req, res) => {
  const polls = (await Poll.find()).map(pollDocument => {
    const poll = pollDocument.toJSON();

    if (poll.status !== "CLOSED") {
      poll.votes = [];
    }
    return poll;
  });
  res.json(polls);
};

exports.getPoll = async (req, res) => {
  const poll = res.locals.poll;
  if (poll.status !== "CLOSED") {
    poll.votes = [];
  }
  res.json(poll);
};

exports.updatePoll = async (req, res) => {
  //get current user from locals
  const user = res.locals.user;
  //Don't allow sending along prefilled votes
  if (req.body.votes !== undefined) {
    throw new Error("Votes must be undefined on patch requests");
  }
  const oldPoll = await Poll.findOne({ _id: req.params.pollId });
  //check if poll exists
  if (!oldPoll) {
    throw new Error(`Couldn't find a poll with id ${req.params.pollId}`);
  }
  //Check if user is the one who created the poll (.toString because mongoose only gives us back object ids)
  if (oldPoll.creator.toString() !== user._id.toString()) {
    throw new Error("You can only update your own polls");
  }
  //Don't allow changing the options if the votes are already running
  if (oldPoll.status !== "DRAFT" && req.body.options !== undefined) {
    throw new Error("Cannot set options when status is not 'DRAFT'");
  }
  if (oldPoll.status !== "DRAFT" && req.body.status === "DRAFT") {
    req.body.votes = [];
  }
  const updatedPoll = await Poll.findOneAndUpdate(
    { _id: req.params.pollId },
    req.body,
    {
      new: true, //return the new poll instead of the old one
      runValidators: true
    }
  );
  res.json(updatedPoll);
};

exports.deletePoll = async (req, res) => {
  const user = res.locals.user;
  const oldPoll = await Poll.findOne({ _id: req.params.pollId });
  //check if poll exists
  if (!oldPoll) {
    throw new Error(`Couldn't find a poll with id ${req.params.pollId}`);
  }
  //Check if user is the one who created the poll (.toString because mongoose only gives us back object ids)
  if (oldPoll.creator.toString() !== user._id.toString()) {
    throw new Error("You can only delete your own polls");
  }
  //Don't allow changing the options if the votes are already running
  if (oldPoll.status !== "DRAFT") {
    throw new Error("Cannot delete when status is not 'DRAFT'");
  }
  const deletedPoll = await Poll.findOneAndDelete({ _id: req.params.pollId });
  res.json(deletedPoll);
};
