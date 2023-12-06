const { z } = require("zod");

exports.countrySchema = z.object({
  country_name: z.string({
    required_error: "country is required",
  }),
});
