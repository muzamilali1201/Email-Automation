const customError = require("../utils/error");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof customError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;
