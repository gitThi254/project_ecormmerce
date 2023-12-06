const { z } = require("zod");

exports.registerSchema = z.object({
  email_address: z
    .string({
      required_error: "email is required",
    })
    .email("Email is invalid")
    .min(3, { message: "email must have at least 3 characters" })
    .max(20, { message: "email must ot exceed 20 characters" }),
  phone_number: z
    .string({
      required_error: "email is required",
    })
    .length(10, "phone number must have 10 characters"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(3, { message: "password must have least 3 characters" })
    .max(20, "Password must not exceed 20 characters"),
});

exports.loginSchema = z.object({
  email_address: z.string({
    required_error: "email is required",
  }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(3, { message: "password must have least 3 characters" })
    .max(20, "Password must not exceed 20 characters"),
});
