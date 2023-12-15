const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || ["An unknown error"],
  });
};

const successHandler = (err, req, res, next) => {
  res.status(err.status || 204).json({
    message: err.message || ["No Response"],
  });
};

module.exports = {
  errorHandler,
  successHandler,
};
