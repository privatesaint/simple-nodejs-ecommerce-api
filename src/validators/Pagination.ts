import customJoi from "../utils/CustomJoi";

export default async (data) => {
  const requestSchema = customJoi.object({
    page: customJoi.number().htmlStrip().required().messages({
      "number.base": "Invalid value",
      "number.empty": "Page is required",
      "any.required": "Page is required",
    }),
    limit: customJoi.number().htmlStrip().required().messages({
      "number.base": "Invalid value",
      "number.empty": "Page limit is required",
      "any.required": "Page limit is required",
    }),
  });

  return requestSchema.validateAsync(data);
};
