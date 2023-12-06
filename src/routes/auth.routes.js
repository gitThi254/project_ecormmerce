const { Router } = require("express");
const router = Router();

const { register, login } = require("../controllers/auth.controller");
const validatorSchema = require("../middlewares/validatorSchema");
const { registerSchema, loginSchema } = require("../schemas/user.schema");

router.post("/register", validatorSchema(registerSchema), register);
router.post("/login", validatorSchema(loginSchema), login);

module.exports = router;
