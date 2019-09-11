const { promisify } = require("util");
const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getUser = async (req, res) => {
  const user = res.locals.user;
  res.json(user);
};

exports.createUser = async (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ status: "fail", errors: errors.array() });
  }
  const user = await new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  //use .bind to tell promisify on which Object to call the function register
  const register = promisify(User.register.bind(User));
  await register(user, req.body.password);
  next();
};
