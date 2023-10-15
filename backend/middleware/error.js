const Errorhandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Interval server Error";

  //* Wrong MongoDB ID error

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  //* MOngoose Duplicate Key Error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`,
      err = new Errorhandler(message, 400);
  }

  //* Wrong JSON  error

  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid,try again`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}