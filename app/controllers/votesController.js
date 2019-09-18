const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

exports.getVote = async (req, res) => {
  const user = req.user;
  const poll = res.locals.poll;
  if (!poll) {
    throw new Error(`Unknown poll with id ${req.params.pollId}`);
  }
  if (!poll.votes || poll.votes.length === 0) {
    res.json({ status: "fail", usersFirstVote: true });
  }
  //Find out the voteId
  console.log("FIRST VOTE IN POLLS", poll.votes[0]);
  console.log("USER ID OF VOTE", poll.votes[0].userId.toJSON());
  const vote = poll.votes.find(vote => vote.userId.toJSON() === user.id);
  // if so, get vote with userId
  if (!vote) {
    res.json({ status: "fail", usersFirstVote: true });
  } else {
    res.json(vote);
  }
};

exports.getVotes = async (req, res) => {
  const poll = res.locals.poll;
  //check if status is CLOSED at all
  if (poll.status !== "CLOSED") {
    res.status(403);
    throw new Error(
      "You can only look at the results when the poll is closed."
    );
  }
  res.json(poll.votes);
};

exports.createVote = async (req, res) => {
  const poll = res.locals.poll;
  const user = req.user;
  if (poll.status !== "OPEN") {
    throw new Error("You can only vote when the poll is open.");
  }
  const existingVote = poll.votes.find(
    vote => vote.userId.toJSON() === user.id
  );
  if (existingVote) {
    throw new Error("Seems like this user has already voted.");
  }
  const vote = await new Vote({
    ranking: req.body,
    userId: user._id
  }).save();
  poll.votes.push(vote);
  await poll.save();
  res.status(201);
  res.json({ status: "success", data: vote });
};

exports.updateVote = async (req, res) => {
  const user = req.user;
  const ranking = req.body.ranking;

  const poll = res.locals.poll;
  if (!poll) {
    throw new Error(`Unknown poll with id ${req.params.pollId}`);
  }
  if (!poll.votes || poll.votes.length === 0) {
    throw new Error(
      `Update not possible: There aren't any votes for this poll`
    );
  }

  if (poll.status !== "OPEN") {
    res.status(403);
    throw new Error("You can only update your vote when the poll is open.");
  }

  //Find oldVote in polls
  const oldVote = poll.votes.find(vote => vote.userId.toJSON() === user.id);

  const updatedVote = await Vote.findOneAndUpdate(
    { _id: oldVote._id },
    { ranking: ranking },
    {
      new: true,
      runValidators: true
    }
  ).exec();
  res.status(201);
  res.json({ status: "success", data: updatedVote });
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
