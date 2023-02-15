const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Simple Ecommerce API",
      description: `This is a simple nodejs ecommerce api.`,
    },
    servers: [
      { description: "Local", url: `http://localhost:${process.env.PORT}/v1` },
      {
        description: "Production",
        url: `https://simple-ecommerce-api-zvzk.onrender.com/v1`,
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};

export default swaggerOptions;
