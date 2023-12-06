const { error_404 } = require("../error/error_function");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const asyncHandlerError = require("../utils/asyncHandlerError");

exports.createAddress = asyncHandlerError(async (req, res, next) => {
  const { _id } = req.user;
  const newAddress = await Address.create(req.body).then(async (address) => {
    await User.findById(_id).then(async (user) => {
      return await user.updateOne({
        $push: { "address.address_array": address._id },
        $set:
          user.address.address_array.length === 0
            ? { "address.is_default": address._id }
            : undefined,
      });
    });
    return address;
  });

  res.status(201).json(newAddress);
});

exports.getAllAddress = asyncHandlerError(async (req, res, next) => {
  const addresses = await Address.find();
  res.json(addresses);
});

exports.getAddress = asyncHandlerError(async (req, res, next) => {
  const address = await Address.findById(req.params.id);
  if (!address) {
    return next(error_404("address", req.params.id));
  }
  res.json(address);
});

exports.updateAddress = asyncHandlerError(async (req, res, next) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!address) {
    return next(error_404("address", req.params.id));
  }
  res.json(address);
});

exports.deleteAddress = asyncHandlerError(async (req, res, next) => {
  const { _id } = req.user;
  const address = await Address.findByIdAndDelete(req.params.id).then(
    async (address) => {
      await User.findById(_id).then(async (user) => {
        return await user.updateOne({
          $pull: {
            "address.address_array": address._id,
          },
          $set:
            user.address.is_default.toString() === address.id
              ? { "address.is_default": null }
              : undefined,
        });
      });
      return address;
    }
  );
  if (!address) {
    return next(error_404("address", req.params.id));
  }
  res.json(address);
});
