const passport = require("passport");
const passportJwt = require("passport-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const uniqid = require("uniqid");

//Define passport options and strategy for decoding the JWT token from the request's header...
// We use the same .env variable as key for creating and verifying the JWT token
const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromHeader("authentication"),
  secretOrKey: process.env.SECRET
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (jwtPayload, done) => {
    const { token } = jwtPayload;
    // Passport compares this JWT token it with the uniquId token saved in the database.
    User.findOne({ token }).then(
      user => {
        done(null, user === undefined ? false : user);
      },
      //Passport will also throw an error when the JWT token has expired.
      error => {
        done(error);
      }
    );
  })
);

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    //verifyPassword is a method that comes with bcrypt
    const valid = await user.verifyPassword(password);

    if (valid === true) {
      //create a unique string/token for that user
      user.token = uniqid();
      //Save it to the database
      await user.save();
      res.locals.user = user.toJSON();
      //With this unique string and a key from the env.-variables, JWT creates a unique JWT token, also encrypting the expiry date.
      //Saved to res.locals so we can send the JWT token to the client in the next step.
      res.locals.token = jwt.sign(
        { token: user.token },
        jwtOptions.secretOrKey,
        {
          expiresIn: "7d"
        }
      );

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

// On logout, the uniquid token is deleted from the database to make sure the JWT token cannot be used any more (even if it hasn't exoired yet).
exports.logout = async (req, res, next) => {
  const userWithoutToken = await User.findOneAndUpdate(
    { token: req.user.token },
    { $unset: { token: 1 } },
    {
      new: true
    }
  ).exec();
  res.locals.user = userWithoutToken.toJSON();
  next();
};

exports.handleSuccess = (req, res) => {
  res.status(201);
  const { password, __v, ...user } = res.locals.user;
  user.token = res.locals.token;
  res.json({ status: "success", data: user });
};

exports.handleError = (err, req, res, next) => {
  if (err.name === "UserExistsError") {
    res.status(422);
    res.json({ status: "fail", errors: [{ msg: err.message }] });
  }
  if (err.message) {
    res.status(401);
    res.json({ status: "fail", errors: [{ msg: err.message }] });
  } else {
    next(err);
  }
};
