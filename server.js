import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { checkDbConnection } from "./db.js"; // Import checkDbConnection function
import userRoutes from "./routes/user.js"; // Import user routes
import { serverRunning } from "./helper/consoleLog.js";
import { swaggerSpec, swaggerUi } from "./helper/swagger.js"; // Import Swagger spec and UI

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// Serve Swagger API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger documentation accessible at /api-docs

app.use("/user", userRoutes); // Add user routes to the server

checkDbConnection(); // Check database connection

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => serverRunning(PORT));
