// db.js
import postgres from "postgres";
import dotenv from "dotenv";
import { dbConnected, dbConnectionFailed } from "./helper/consoleLog.js";
// Load environment variables
dotenv.config();

// Database connection string
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

// Function to check the DB connection
const checkDbConnection = async () => {
  try {
    // Simple query to check the connection
    await sql`SELECT 1`; // Query to check DB connection
    dbConnected(); // Success message
  } catch (error) {
    dbConnectionFailed(error); // Error message
    process.exit(1); // Exit the process  with an error
  }
};

async function checkDbName() {
  try {
    const result = await sql`SELECT current_database()`;
    console.log("Connected to database:", result[0].current_database);
  } catch (error) {
    console.error("Error checking database name:", error);
  }
}

checkDbName();

export { sql, checkDbConnection };
