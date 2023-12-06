const User = require("../models/user.model");
const CustomeError = require("../utils/CustomError");
const asyncHandlerError = require("../utils/asyncHandlerError");
const jwt = require("jsonwebtoken");
exports.authRequired = asyncHandlerError(async (req, res, next) => {
  const { token_auth } = req.cookies;
  if (!token_auth) return next(new CustomeError("You are not logged", 401));
  jwt.verify(token_auth, process.env.SECRET_STR, async (err, token_auth) => {
    if (err)
      return next(
        new CustomeError("Invalid or Expire token, Please logged again!", 404)
      );
    const user = await User.findById(token_auth.id);
    req.user = user;
    next();
  });
});

exports.isAdmin = asyncHandlerError(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin")
    return next(new CustomeError("You are not admin!", 401));
  next();
});
