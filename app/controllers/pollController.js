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
  //get current user from where we saved it in locals
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
  ).exec();
  res.json(updatedPoll);
};
// exports.updateStore = async (req, res) => {
//   //add Geocoding Attribute on update
//   req.body.location.type = "Point";
//   const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
//     new: true, //return the new store instead of the old one
//     runValidators: true
//   }).exec();
//   req.flash(
//     "success",
//     `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${
//       store.slug
//     }">View Store</a>`
//   );
//   res.redirect(`/stores/${store.slug}`);
// };

// exports.editStore = async (req, res) => {
//   // Find the store given the ID
//   const store = await Store.findOne({ _id: req.params.id });
//   res.render("edit", { title: `Edit ${store.name}`, store });
//   //confirm they are the owner of the store
//   // render out the edit form so the user can update their store
// };
