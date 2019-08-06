const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Poll = mongoose.model("Poll");

exports.createPoll = async (req, res) => {
  const poll = await new Poll(req.body).save();
  console.log("It works!");
  res.status(201);
  res.end();
  // res.redirect(`/stores/${store.slug}`);
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
