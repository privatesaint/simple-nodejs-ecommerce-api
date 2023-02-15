import customJoi from "../../utils/CustomJoi";

export default async (data) => {
  const requestSchema = customJoi.object({
    name: customJoi.string().htmlStrip().required().messages({
      "string.base": "Invalid product name value",
      "string.empty": "Product name is required",
      "any.required": "Product name is required",
    }),
    category: customJoi.string().htmlStrip().required().messages({
      "string.base": "Invalid product category value",
      "string.empty": "Product category is required",
      "any.required": "Product category is required",
    }),
    description: customJoi.string().htmlStrip().required().messages({
      "string.base": "Invalid description value",
      "string.empty": "Product description is required",
      "any.required": "Product description is required",
    }),
    quantity: customJoi.number().htmlStrip().min(1).required().messages({
      "string.base": "Invalid quantity value",
      "string.empty": "Product quantity is required",
      "number.min": "Product quantity can not be less than 1",
      "any.required": "Product quantity is required",
    }),
    price: customJoi.number().htmlStrip().min(1).required().messages({
      "string.base": "Invalid value",
      "string.empty": "Product price is required",
      "number.min": "Product price can not be less than 1",
      "any.required": "Product price is required",
    }),
  });

  return requestSchema.validateAsync(data);
};
