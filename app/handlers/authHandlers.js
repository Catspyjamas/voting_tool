const passport = require("passport");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const authenticate = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

exports.findUser = (req, res, next) => {
  authenticate(req, res, error => {
    if (error && error.message === "Unauthorized") {
      res.status(401);
      res.json({
        status: "error",
        errors: [
          {
            msg:
              "Unauthorized. Create an account or log in again (your session might have expired) ."
          }
        ]
      });
      return;
    }
    next(error);
  });
};

//exports.findUser = passport.authenticate("jwt", { session: false });

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
exports.validateChangeVote = [
  body("newEmail", "That Email is not valid!").isEmail(),
  sanitizeBody("newEmail").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }),
  body("password", "Please supply your current password.")
    .not()
    .isEmpty()
];
