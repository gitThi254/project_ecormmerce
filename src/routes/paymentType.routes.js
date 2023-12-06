const { Router } = require("express");
const {
  createCountry,
  getallCountry,
  getCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country.controller");
const validatorSchema = require("../middlewares/validatorSchema");
const { countrySchema } = require("../schemas/country.schema");
const { authRequired, isAdmin } = require("../middlewares/auth.middleware");
const { paymentTypeSchema } = require("../schemas/payment.schema");
const {
  createPaymentType,
  getallPaymentType,
  getPaymentType,
  updatePaymentType,
  deletePaymentType,
} = require("../controllers/paymentType.controller");
const router = Router();

router
  .route("/")
  .get(getallPaymentType)
  .post(
    authRequired,
    isAdmin,
    validatorSchema(paymentTypeSchema),
    createPaymentType
  );
router
  .route("/:id")
  .get(getPaymentType)
  .put(authRequired, isAdmin, updatePaymentType)
  .delete(authRequired, isAdmin, deletePaymentType);

module.exports = router;
