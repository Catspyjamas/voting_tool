const { validationResult } = require("express-validator");

exports.getUser = async (req, res) => {
  const user = res.locals.user;
  res.json(user);
};

exports.createUser = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ status: "fail", errors: errors.array() });
  }
  res.json({ status: "success", data: req.body });
};
