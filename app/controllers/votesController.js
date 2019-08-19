const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

exports.getVote = async (req, res) => {
  //get poll id from params
  const poll = res.locals.poll;
  //check if user is authorized to get this vote (token matches param)
  const user = res.locals.user;
  if (user.id !== req.params.userId) {
    res.status(401);
    throw new Error(`Please log in`);
  }
  // if so, get vote with userId
  const vote = await Vote.findOne({ userId: req.params.userId });
  if (!vote) {
    // throw new Error(
    //   `Couldn't find a vote for poll ${poll.title} and user Id ${
    //     req.params.userId
    //   }`
    // );
    res.json({ usersFirstVote: true });
  }
  res.json(vote);
};

exports.getVotes = async (req, res) => {
  const queriedPoll = res.locals.poll;
  //check if status is CLOSED at all
  if (queriedPoll.status !== "CLOSED") {
    res.status(403);
    throw new Error(
      "You can only look at the results when the poll is closed."
    );
  }
  const pollResults = await Poll.findOne({ _id: req.params.pollId }).populate(
    "votes"
  );
  res.json(pollResults);
};

exports.createVote = async (req, res) => {
  //get poll id from params
  const poll = res.locals.poll;
  //check if user is authorized to get this vote (token matches param)
  const user = res.locals.user;
  if (poll.status !== "OPEN") {
    res.status(401);
    throw new Error("You can only vote when the poll is open.");
  }
  //check if vote from this user exists already
  const existingVote = await Vote.findOne({ userId: user._id });
  if (existingVote) {
    throw new Error(
      `There's another vote for this userId. You can only vote once.`
    );
  }
  const vote = await new Vote({ ...req.body, userId: user._id }).save();
  poll.votes.push(vote);
  await poll.save();
  res.status(201);
  res.json(vote);
};

exports.updateVote = async (req, res) => {
  const poll = res.locals.poll;
  const user = res.locals.user;
  const ranking = req.body.ranking;
  if (user.id !== req.params.userId) {
    throw new Error("You can only update your own votes");
  }
  if (poll.status !== "OPEN") {
    res.status(403);
    throw new Error("You can only update your vote when the poll is open.");
  }
  const newVote = await Vote.findOneAndUpdate(
    { userId: user._id },
    { ranking: ranking },
    {
      new: true,
      runValidators: true
    }
  ).exec();

  res.json(newVote);
};

exports.deleteVote = async (req, res) => {
  const poll = res.locals.poll;
  const user = res.locals.user;
  if (user.id !== req.params.userId) {
    throw new Error("You can only delete your own votes");
  }
  if (poll.status !== "OPEN") {
    res.status(403);
    throw new Error("You can only update your vote when the poll is open.");
  }
  const deletedVote = await Vote.findOneAndDelete({ userId: user._id });
  res.json(deletedVote);
};
