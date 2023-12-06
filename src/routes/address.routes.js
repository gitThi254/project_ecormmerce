const { Router } = require("express");
const {
  createAddress,
  getAllAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");
const { authRequired, isAdmin } = require("../middlewares/auth.middleware");
const validatorSchema = require("../middlewares/validatorSchema");
const { addressSchema } = require("../schemas/address.schema");
const router = Router();

router
  .route("/")
  .get(authRequired, isAdmin, getAllAddress)
  .post(authRequired, isAdmin, validatorSchema(addressSchema), createAddress);

router
  .route("/:id")
  .get(authRequired, getAddress)
  .put(authRequired, isAdmin, updateAddress)
  .delete(authRequired, isAdmin, deleteAddress);

module.exports = router;
