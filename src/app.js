const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const CustomeError = require("./utils/CustomError");
const globalHandlerError = require("./controllers/err.controller");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// url does not exist
app.all("*", (req, res, next) =>
  next(new CustomeError(`Can't not find ${req.originalUrl} on the server`, 404))
);

// global handler error

app.use(globalHandlerError);

module.exports = app;
