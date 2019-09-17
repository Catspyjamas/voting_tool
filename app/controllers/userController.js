const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getUser = async (req, res) => {
  const { password, ...user } = req.user;
  res.json({ status: "success", user: user });
};

exports.createUser = async (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ status: "fail", errors: errors.array() });
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  await user.save();

  res.locals.user = user;
  next();
};
