const { error_404 } = require("../error/error_function");
const PaymentType = require("../models/payment_type");
const asyncHandlerError = require("../utils/asyncHandlerError");

exports.createPaymentType = asyncHandlerError(async (req, res, next) => {
  const newPaymentType = await PaymentType.create(req.body);
  res.status(201).json(newPaymentType);
});

exports.getallPaymentType = asyncHandlerError(async (req, res, next) => {
  const allPaymentType = await PaymentType.find();
  res.json(allPaymentType);
});

exports.getPaymentType = asyncHandlerError(async (req, res, next) => {
  const paymentType = await PaymentType.findById(req.params.id);
  if (!paymentType) {
    return next(error_404("payment type", req.params.id));
  }
  res.json(paymentType);
});

exports.updatePaymentType = asyncHandlerError(async (req, res, next) => {
  const paymentType = await PaymentType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!paymentType) {
    return next(error_404("payment type", req.params.id));
  }
  res.json(paymentType);
});

exports.deletePaymentType = asyncHandlerError(async (req, res, next) => {
  const deletePaymentType = await PaymentType.findByIdAndDelete(req.params.id);

  if (!deletePaymentType) {
    return next(error_404("payment type", req.params.id));
  }
  res.json(deletePaymentType);
});
