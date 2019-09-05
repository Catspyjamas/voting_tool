const User = require("../models/User");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const { validationResult } = require("express-validator");

exports.findUser = async (req, res, next) => {
  //was authorization token sent with headers?
  const userToken = req.headers["authorization"];
  //check if it matches /w user from database
  const user = await User.findOne({ token: userToken });

  if (!user) {
    throw new Error(`Unknown authorization token: ${userToken}`);
  }
  //save userObject in locals for middleware to use
  res.locals.user = user;
  next();
};

exports.validateSignup = [
  sanitizeBody("firstName"),
  body("firstName", "You must supply a first name!")
    .not()
    .isEmpty(),
  sanitizeBody("lastName"),
  body("lastName", "You must supply a last name!")
    .not()
    .isEmpty(),
  body("email", "That Email is not valid!").isEmail(),
  sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }),
  body("password", "Password cannot be blank!")
    .not()
    .isEmpty(),
  body("passwordConfirm", "Confirmed Password cannot be blank!")
    .not()
    .isEmpty()
  // body("passwordConfirm", "Oops! Your passwords do not match").equals(
  //   req.body.password
  // ),
];

exports.createUser = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    // https://github.com/omniti-labs/jsend
    console.log({ errors: errors.array() });
    return res.status(422).json({ status: "fail", errors: errors.array() });
  }
  res.json(req.body);
};
