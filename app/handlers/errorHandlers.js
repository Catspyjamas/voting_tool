exports.catchErrors = fn => {
  return (req, res, next) => {
    let returned;

    try {
      returned = fn(req, res, next);
    } catch (error) {
      next(error);
      return;
    }

    if (returned && typeof returned.catch === "function") {
      returned.catch(next);
      return;
    }
  };
};
