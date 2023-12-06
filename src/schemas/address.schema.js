const { z } = require("zod");

exports.addressSchema = z.object({
  unit_number: z.string({
    required_error: "Unit is required",
  }),
  street_number: z.string({
    required_error: "street is required",
  }),
  address_line1: z.string({
    required_error: "address line 1 is required",
  }),
  address_line1: z.string({
    required_error: "address line 2 is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  region: z.string({
    required_error: "region is required",
  }),
  country_id: z.string({
    required_error: "country id is required",
  }),
});
