import dotenv from "dotenv";
import express, { json } from "express";
import dbInitRoutes from "./routes/dbInit.js";
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
app.use("/api", dbInitRoutes);
// Start server after database connection is established
const startServer = async () => {
  try {
    // Check database connection with retry logic
    const connected = await checkDbConnection();

    if (!connected) {
      console.error("Failed to connect to database after multiple attempts");
      process.exit(1);
    }

    // Only start the server if the database connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => serverRunning(PORT));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// Run the async function to start the server
startServer();
