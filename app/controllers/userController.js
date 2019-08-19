exports.getUser = async (req, res) => {
  const user = res.locals.user;
  res.json(user);
};
