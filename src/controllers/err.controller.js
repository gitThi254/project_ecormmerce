const CustomeError = require("../utils/CustomError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    err = err.keyValue.email_address
      ? new CustomeError(
          "Email already exists, Please enter another email",
          400
        )
      : err.keyValue.phone_number
      ? new CustomeError(
          "Phone number exists, Please enter another phone number",
          400
        )
      : err.keyValue.country_name
      ? new CustomeError("Country exists, Please enter another Country", 400)
      : null;
  }

  if (err.name === "CastError") {
    err = new CustomeError(
      `Invalid value ${err.path} for field ${err.value}`,
      400
    );
  }
  res.status(err.statusCode).json({
    errorMsg: err.message,
    error: err,
    stackTrack: err.stack,
  });
};
