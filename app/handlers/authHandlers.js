const passport = require("passport");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

exports.findUser = passport.authenticate("jwt", { session: false });

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
    .isEmpty()
];
