const { default: mongoose, model } = require("mongoose");

const paymentTypeSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const PaymentType = model("PaymentType", paymentTypeSchema);
module.exports = PaymentType;
