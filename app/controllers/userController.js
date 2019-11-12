const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getUser = async (req, res) => {
  const user = req.user.toJSON();
  const { password, token, __v, ...cleanUser } = user;
  res.json({ status: "success", data: cleanUser });
};

exports.createUser = async (req, res, next) => {
  // Esxpress validator finds the validation errors in this request and wraps them in an object with handy functions
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

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  const { newFirstName, newLastName, newEmail } = req.body;
  const currentPassword = req.body.password;
  //The password hasn't necessarily been changed. if not, use the old one
  const newPassword = req.body.newPassword
    ? req.body.newPassword
    : currentPassword;

  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ status: "fail", errors: errors.array() });
  }
  const userModel = await User.findOne({ _id: req.user._id });
  if (userModel !== undefined) {
    const valid = await userModel.verifyPassword(currentPassword);

    if (valid === true) {
      userModel.firstName = newFirstName;
      userModel.lastName = newLastName;
      userModel.email = newEmail;
      userModel.password = newPassword;
      const newUserModel = await userModel.save();

      res.locals.user = newUserModel.toJSON();

      next();
      return;
    }
  }
  next(
    new Error(
      "Authentication failed. Either this user doesn't exist or the password's wrong."
    )
  );
};
