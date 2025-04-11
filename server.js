import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { checkDbConnection } from "./db.js"; // Import checkDbConnection function
import { serverRunning } from "./helper/consoleLog.js";
import { swaggerSpec, swaggerUi } from "./helper/swagger.js"; // Import Swagger spec and UI

// routes
import defaultRoute from "./routes/defaultRoute.js"; // Default route for the server
import userRoutes from "./routes/user.js";
import companyRoutes from "./routes/company.js";
import branchRoutes from "./routes/branch.js";
import shiftRoutes from "./routes/shift.js";
import employeeRoutes from "./routes/employee.js";
import employeeShiftRoutes from "./routes/employeeShift.js";
import driverRoutes from "./routes/driver.js";
import vehicleRoutes from "./routes/vehicle.js";
import transportScheduleRoutes from "./routes/transportSchedule.js";
import driverConfirmationRoutes from "./routes/driverConfirmation.js";
import employeeConfirmationRoutes from "./routes/employeeConfirmation.js";
import tripRoutes from "./routes/trip.js";
import liveLocationRoutes from "./routes/liveLocation.js";
import tripTrackerRoutes from "./routes/tripTracker.js";
import dbInitRoutes from "./routes/dbInit.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// Serve Swagger API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger documentation accessible at /api-docs
app.use("/company", companyRoutes);
app.use("/branch", branchRoutes);
app.use("/shift", shiftRoutes);
app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);
app.use("/employee-shift", employeeShiftRoutes);
app.use("/driver", driverRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/transport-schedule", transportScheduleRoutes);
app.use("/driver-confirmation", driverConfirmationRoutes);
app.use("/employee-confirmation", employeeConfirmationRoutes);
app.use("/trip", tripRoutes);
app.use("/live-location", liveLocationRoutes);
app.use("/trip-tracker", tripTrackerRoutes);
app.use("/db-init", dbInitRoutes);
app.use("", defaultRoute);
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
