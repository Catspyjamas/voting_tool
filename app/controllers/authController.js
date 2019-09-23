const passport = require("passport");
const passportJwt = require("passport-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const uniqid = require("uniqid");

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromHeader("authentication"),
  secretOrKey: process.env.SECRET
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (jwtPayload, done) => {
    const { token } = jwtPayload;
    // console.log("TOKEN:", token);
    User.findOne({ token }).then(
      user => {
        // console.log("USER:", user);

        done(null, user === undefined ? false : user);
      },
      error => {
        // console.log("COULDN't FIND A USER", error);

        done(error);
      }
    );
  })
);

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user !== undefined) {
    const valid = await user.verifyPassword(password);

    if (valid === true) {
      user.token = uniqid();
      await user.save();
      res.locals.user = user.toJSON();
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
  next(new Error("Wrong"));
};

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
    return;
  }
  next(err);
};
