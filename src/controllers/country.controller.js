const { error_404 } = require("../error/error_function");
const Address = require("../models/address.model");
const Country = require("../models/country.model");
const asyncHandlerError = require("../utils/asyncHandlerError");

exports.createCountry = asyncHandlerError(async (req, res, next) => {
  const newCountry = await Country.create(req.body);
  res.status(201).json(newCountry);
});

exports.getallCountry = asyncHandlerError(async (req, res, next) => {
  const countries = await Country.find();
  res.json(countries);
});

exports.getCountry = asyncHandlerError(async (req, res, next) => {
  const country = await Country.findById(req.params.id);
  if (!country) {
    return next(error_404("country", req.params.id));
  }
  res.json(country);
});

exports.updateCountry = asyncHandlerError(async (req, res, next) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!country) {
    return next(error_404("country", req.params.id));
  }
  res.json(country);
});

exports.deleteCountry = asyncHandlerError(async (req, res, next) => {
  const deleteCountry = await Country.findByIdAndDelete(req.params.id).then(
    async (country) => {
      await Address.updateMany(
        { country_id: country._id },
        { $set: { country_id: null } }
      );

      return country;
    }
  );
  if (!deleteCountry) {
    return next(error_404("country", req.params.id));
  }
  res.json(deleteCountry);
});
