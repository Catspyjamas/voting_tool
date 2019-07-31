const mongoose = require("mongoose");
const Test = mongoose.model("Test");

exports.createTest = async (req, res) => {
  const test = await new Test({ name: "Tanner" }).save();
  console.log("It works!");
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
