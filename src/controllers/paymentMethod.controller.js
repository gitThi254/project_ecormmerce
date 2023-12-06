const PaymentMethod = require("../models/payment_method");
const asyncHandlerError = require("../utils/asyncHandlerError");

exports.createPaymentMethod = asyncHandlerError(async (req, res, next) => {
  const { _id } = req.user;
  const newPaymenntMethod = await PaymentMethod.create({
    ...req.body,
    user_id: _id,
  });
  res.status(201).json(newPaymenntMethod);
});

exports.getPaymentMethods = asyncHandlerError(async (req, res, next) => {
  const { _id } = req.user;
  const paymentMethod = await PaymentMethod.find({ user_id: _id });
  res.json(paymentMethod);
});
