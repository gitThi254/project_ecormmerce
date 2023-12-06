const { z } = require("zod");

exports.paymentTypeSchema = z.object({
  value: z.string({
    required_error: "payment type is required",
  }),
});
