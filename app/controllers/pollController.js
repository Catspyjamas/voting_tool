const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {
  //check if user is logged in
  const user = req.user;
  if (Array.isArray(req.body.votes) === true && req.body.votes.length > 0) {
    res.status(403);
    res.json({
      status: "fail",
      errors: [{ msg: "You cannot create a poll with votes." }]
    });
    return;
  }
  //delete _id from request so mongoose lets us save more instances of the same object
  delete req.body._id;
  const poll = await new Poll({ ...req.body, creator: user._id }).save();
  res.status(201);
  //201: for created
  res.json({ status: "success", data: poll });
};

exports.getPolls = async (req, res) => {
  const polls = (await Poll.find()).map(pollDocument => {
    const poll = pollDocument.toJSON();

    if (poll.status !== "CLOSED") {
      poll.votes = [];
    }
    const { creator, date, __v, __proto__, ...cleanPoll } = poll;
    return cleanPoll;
  });
  res.json({ status: "success", data: polls });
};

exports.getPoll = async (req, res) => {
  const poll = res.locals.poll.toJSON();
  if (poll.status !== "CLOSED") {
    poll.votes = [];
  }
  const { creator, date, __v, __proto__, ...cleanPoll } = poll;
  return res.json({ status: "success", data: { poll: cleanPoll } });
};

exports.updatePoll = async (req, res) => {
  //get current user from locals
  const user = req.user;
  //Don't allow sending along prefilled votes
  if (req.body.votes !== undefined) {
    res.json({
      status: "fail",
      errors: [{ msg: "You cannot add votes. Please vote instead." }]
    });
    return;
  }
  const oldPoll = await Poll.findOne({ _id: req.params.pollId });
  //check if poll exists
  if (!oldPoll) {
    throw new Error(`Couldn't find a poll with id ${req.params.pollId}`);
  }
  //Check if user is the one who created the poll (.toString because mongoose only gives us back object ids)
  // if (oldPoll.creator.toString() !== user._id.toString()) {
  //   throw new Error("You can only update your own polls");
  // }
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
  res.status(200);
  res.json({ status: "success", data: updatedPoll });
};

exports.deletePoll = async (req, res) => {
  const user = req.user;
  const oldPoll = await Poll.findOne({ _id: req.params.pollId });
  //check if poll exists
  if (!oldPoll) {
    throw new Error(`Couldn't find a poll with id ${req.params.pollId}`);
  }
  //Check if user is the one who created the poll (.toString because mongoose only gives us back object ids)
  // if (oldPoll.creator.toString() !== user._id.toString()) {
  //   throw new Error("You can only delete your own polls");
  // }
  //Don't allow changing the options if the votes are already running
  if (oldPoll.status !== "DRAFT") {
    throw new Error("Cannot delete when status is not 'DRAFT'");
  }
  const deletedPoll = await Poll.findOneAndDelete({ _id: req.params.pollId });
  res.status(204);
  res.json({ status: "success", data: deletedPoll });
};
