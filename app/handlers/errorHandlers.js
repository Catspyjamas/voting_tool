exports.catchErrors = fn => {
  return (req, res, next) => {
    let returned;
    try {
      returned = fn(req, res, next);
    } catch (error) {
      next(error);
      return;
    }
    //if it's a promise, call next with the catch method on this promise
    if (returned && typeof returned.catch === "function") {
      returned.catch(next);
      return;
    }
  };
};
