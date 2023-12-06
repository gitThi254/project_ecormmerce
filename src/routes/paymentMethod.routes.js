const { Router } = require("express");
const router = Router();

const {
  createPaymentMethod,
  getPaymentMethods,
} = require("../controllers/paymentMethod.controller");
const { authRequired } = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(authRequired, getPaymentMethods)
  .post(authRequired, createPaymentMethod);

module.exports = router;
