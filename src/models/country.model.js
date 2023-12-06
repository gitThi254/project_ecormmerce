const { default: mongoose, model } = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Country = model("Country", CountrySchema);

module.exports = Country;
