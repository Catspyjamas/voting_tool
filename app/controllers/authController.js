const User = require("../models/User");
const passport = require("passport");

exports.login = (req, res, next) => {
  passport.authenticate("local", function(err) {
    if (err) {
      console.log("THERE WAS AN ERROR", err);
      return next(err);
    }
    // if (!user) {
    //   return res.redirect("/login");
    // }
    // req.logIn(user, function(err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   return res.redirect("/users/" + user.username);
    // });
  });
  res.status(201);
  res.send({ status: "success", data: req.user });
};
