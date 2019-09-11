// const User = require("../models/User");
const passport = require("passport");

exports.login = passport.authenticate("local");

exports.handleSuccess = (req, res) => {
  console.log("USER outside callback ", req.user);

  // if err, res.status(bad code)
  res.status(201);
  res.json({ status: "success", data: req.user });
};

exports.handleError = (err, req, res, next) => {
  console.log("ERROR ", err);
  if (err.name === "UserExistsError") {
    res.status(422);
    res.json({ status: "fail", errors: [{ msg: err.message }] });
    return;
  }
  next(err);
};
