const createAccessToken = require("../libs/jwt");
const User = require("../models/user.model");
const CustomeError = require("../utils/CustomError");
const asyncHandlerError = require("../utils/asyncHandlerError");

exports.register = asyncHandlerError(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

exports.login = asyncHandlerError(async (req, res, next) => {
  const user = await User.findOne({ email_address: req.body.email_address });
  if (!user || !(await user.comparePW(req.body.password))) {
    return next(new CustomeError("Incorrect in email or password", 401));
  }
  const token = await createAccessToken({ id: user._id });
  res.cookie("token_auth", token).json(user);
});
