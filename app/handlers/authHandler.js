const User = require("../models/User");

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
