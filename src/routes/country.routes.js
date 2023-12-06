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
const router = Router();

router
  .route("/")
  .get(getallCountry)
  .post(authRequired, isAdmin, validatorSchema(countrySchema), createCountry);
router
  .route("/:id")
  .get(getCountry)
  .put(authRequired, isAdmin, updateCountry)
  .delete(authRequired, isAdmin, deleteCountry);

module.exports = router;
