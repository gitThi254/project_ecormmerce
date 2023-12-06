const { default: mongoose, model } = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payment_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentType",
    },
    provider: {
      type: String,
    },
    account_number: {
      type: String,
    },
    expiry: Date,
    is_default: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentMethod = model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;
