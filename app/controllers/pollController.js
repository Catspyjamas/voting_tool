const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {
  const user = req.user;
  //If there are already votes sent along, throw an error
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
    //Get rid of mongoose attributes so poll object can be sent back
    const { creator, date, __v, __proto__, ...cleanPoll } = poll;
    return cleanPoll;
  });
  res.json({ status: "success", data: polls });
};

exports.getPoll = async (req, res) => {
  const poll = res.locals.poll.toJSON();
  //Make sure you can't have an early look at the votes
  if (poll.status !== "CLOSED") {
    poll.votes = [];
  }
  //Get rid of mongoose attributes so poll object can be sent back
  const { creator, date, __v, __proto__, ...cleanPoll } = poll;
  return res.json({ status: "success", data: { poll: cleanPoll } });
};

exports.updatePoll = async (req, res) => {
  const user = req.user;
  //Don't allow sending along prefilled votes
  if (req.body.votes !== undefined) {
    res.json({
      status: "fail",
      errors: [{ msg: "You cannot add votes manually." }]
    });
    return;
  }
  const oldPoll = await Poll.findOne({ _id: req.params.pollId });
  //check if poll exists
  if (!oldPoll) {
    res.status(404);
    res.json({
      status: "fail",
      errors: [{ msg: `Couldn't find a poll with id ${req.params.pollId}` }]
    });
    return;
  }
  //Don't allow changing the options if the votes are already running
  if (oldPoll.status !== "DRAFT" && req.body.options !== undefined) {
    res.status(412);
    res.json({
      status: "fail",
      errors: [{ msg: "Cannot set options when status is not 'DRAFT'" }]
    });
    return;
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
    res.status(404);
    res.json({
      status: "fail",
      errors: [{ msg: `Couldn't find a poll with id ${req.params.pollId}` }]
    });
    return;
  }
  //Don't allow changing the options if the votes are already running
  if (oldPoll.status !== "DRAFT") {
    res.status(412);
    res.json({
      status: "fail",
      errors: [{ msg: "Cannot delete when status is not 'DRAFT'" }]
    });
    return;
  }
  const deletedPoll = await Poll.findOneAndDelete({ _id: req.params.pollId });
  res.status(204);
  res.json({ status: "success", data: deletedPoll });
};
