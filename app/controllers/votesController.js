const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

exports.getVote = async (req, res) => {
  const user = res.locals.user;
  const poll = await Poll.findOne({ _id: req.params.pollId }).populate("votes");
  if (!poll) {
    throw new Error(`Unknown poll with id ${req.params.pollId}`);
  }
  if (!poll.votes || poll.votes.length === 0) {
    //! Is it ok to render a response and throw an Error afterwards?
    res.json({ usersFirstVote: true });
    throw new Error(
      `Update not possible: There aren't any votes for this poll yet.`
    );
  }
  //Check if user is authorized to get this vote (token matches param)
  if (req.params.userId && user.id !== req.params.userId) {
    res.status(401);
    throw new Error(`You cannot vote for another user`);
  }
  //Find out the voteId
  const vote = poll.votes.find(vote => vote.userId.toJSON() === user.id);
  // if so, get vote with userId
  if (!vote) {
    res.json({ usersFirstVote: true });
  } else {
    res.json(vote);
  }
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
  const vote = await new Vote({ ...req.body, userId: user._id }).save();
  poll.votes.push(vote);
  await poll.save();
  res.status(201);
  res.json(vote);
};

exports.updateVote = async (req, res) => {
  const user = res.locals.user;
  const ranking = req.body.ranking;

  const poll = await Poll.findOne({ _id: req.params.pollId }).populate("votes");
  if (!poll) {
    throw new Error(`Unknown poll with id ${req.params.pollId}`);
  }
  if (!poll.votes || poll.votes.length === 0) {
    throw new Error(
      `Update not possible: There aren't any votes for this poll`
    );
  }
  if (req.params.userId && user.id !== req.params.userId) {
    throw new Error("You can only update your own votes");
  }
  if (poll.status !== "OPEN") {
    res.status(403);
    throw new Error("You can only update your vote when the poll is open.");
  }

  //Find oldVote in polls
  const oldVote = poll.votes.find(vote => vote.userId.toJSON() === user.id);

  //Manipulate oldVote with new ranking (Don't need this probably)
  //  const oldVoteIndex = poll.votes.findIndex(
  //  vote => vote.userId.toJSON() === user.id
  //);
  // let newVote = { ...oldVote };
  // newVote.ranking = ranking;
  // poll.votes.splice(oldVoteIndex, 1, newVote);
  // await poll.save();
  const updatedVote = await Vote.findOneAndUpdate(
    { _id: oldVote._id },
    { ranking: ranking },
    {
      new: true,
      runValidators: true
    }
  ).exec();

  res.json(updatedVote);
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
