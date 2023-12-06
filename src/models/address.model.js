const { default: mongoose, model } = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    unit_number: {
      type: String,
      required: true,
    },
    street_number: {
      type: String,
      required: true,
    },
    address_line1: {
      type: String,
      required: true,
    },
    address_line2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = model("Address", addressSchema);
module.exports = Address;
