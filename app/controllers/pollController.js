const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Poll = require("../models/Poll");
const User = require("../models/User");

exports.createPoll = async (req, res) => {
  if (Array.isArray(req.body.votes) && req.body.votes.length === 0) {
    const poll = await new Poll(req.body).save();
    console.log("It works!");
    res.status(201);
    //201: for created
    res.json(poll);
  } else {
    throw new Error("Votes must be an empty Array.");
  }
};

exports.getPolls = async (req, res) => {
  const polls = await Poll.find();
  console.log("has been called");
  res.json(polls);
};

exports.getPoll = async (req, res) => {
  const poll = await Poll.findOne({ _id: req.params.id });

  if (!poll) {
    throw new Error(`Couldn't find a poll with id ${req.params.id}`);
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
  const oldPoll = await Poll.findOne({ _id: req.params.id });
  //check if poll exists
  if (!oldPoll) {
    throw new Error(`Couldn't find a poll with id ${req.params.id}`);
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
    { _id: req.params.id },
    req.body,
    {
      new: true, //return the new store instead of the old one
      runValidators: true
    }
  );
  res.json(updatedPoll);
};

exports.deletePoll = async (req, res) => {
  const user = res.locals.user;
  const oldPoll = await Poll.findOne({ _id: req.params.id });
  //check if poll exists
  if (!oldPoll) {
    throw new Error(`Couldn't find a poll with id ${req.params.id}`);
  }
  //Check if user is the one who created the poll (.toString because mongoose only gives us back object ids)
  if (oldPoll.creator.toString() !== user._id.toString()) {
    throw new Error("You can only delete your own polls");
  }
  //Don't allow changing the options if the votes are already running
  if (oldPoll.status !== "DRAFT") {
    throw new Error("Cannot delete when status is not 'DRAFT'");
  }
  const deletedPoll = await Poll.findOneAndDelete({ _id: req.params.id });
  res.json(deletedPoll);
};
