const passport = require("passport");
const passportJwt = require("passport-jwt");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromHeader("authentication"),
  secretOrKey: process.env.SECRET
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (jwtPayload, done) => {
    const { token } = jwtPayload;

    User.findOne({ token }).then(
      user => {
        done(null, user === undefined ? false : user);
      },
      error => {
        done(error);
      }
    );
  })
);

// passport.use(
//   User.createStrategy({
//     usernameField: "email"
//   })
// );

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user !== undefined) {
    const valid = await user.verifyPassword(password);

    if (valid === true) {
      user.token = jwt.sign({ date: Date.now() }, user.password);
      await user.save();
      res.locals.token = jwt.sign(
        { token: user.token },
        jwtOptions.secretOrKey
      );
      next();
      return;
    }
  }
  next(new Error("Wrong"));
};

exports.handleSuccess = (req, res) => {
  // if err, res.status(bad code)
  res.status(201);
  res.json({ status: "success", data: res.locals.token });
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
