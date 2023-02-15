import customJoi from "../utils/CustomJoi";

export default async (data) => {
  const requestSchema = customJoi.object({
    id: customJoi.string().htmlStrip().required().messages({
      "string.base": "Invalid value",
      "string.empty": "Id is required",
      "any.required": "Id is required",
    }),
  });

  return requestSchema.validateAsync(data);
};
