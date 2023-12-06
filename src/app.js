const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const CustomeError = require("./utils/CustomError");
const globalHandlerError = require("./controllers/err.controller");

//routes-start
const authRoutes = require("./routes/auth.routes");
const countryRoutes = require("./routes/country.routes");
const addressRoutes = require("./routes/address.routes");
const paymentTypeRoutes = require("./routes/paymentType.routes");
const paymentMethodRoutes = require("./routes/paymentMethod.routes");

//routes-end

//tool-start
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
//tool-end

//app.use routes -start

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/country", countryRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/payment-type", paymentTypeRoutes);
app.use("/api/v1/payment-method", paymentMethodRoutes);

//app.use routes -end

// url does not exist
app.all("*", (req, res, next) =>
  next(new CustomeError(`Can't not find ${req.originalUrl} on the server`, 404))
);

// global handler error

app.use(globalHandlerError);

module.exports = app;
