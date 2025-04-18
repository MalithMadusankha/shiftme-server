// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ShiftMe API",
    version: "1.0.0",
    description: "API documentation for ShiftMe app",
  },
  servers: [
    {
      url: "http://localhost:5000", // Change to your production URL when deployed
      description: "Local server",
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs (update according to your routes folder)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
