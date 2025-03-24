// db.js
import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";
import { dbConnected, dbConnectionFailed } from "./helper/consoleLog.js";

// Load environment variables
dotenv.config();

// Create a new Pool instance
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@postgres:5432/postgres",
});

// Function to check the DB connection with retry logic
const checkDbConnection = async (maxRetries = 5, retryInterval = 5000) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log(
        `Attempting database connection (${retries + 1}/${maxRetries})...`
      );

      // Get a client from the pool
      const client = await pool.connect();

      // Test the connection
      const result = await client.query("SELECT current_database()");

      // Log success
      dbConnected();
      console.log("Connected to database:", result.rows[0].current_database);

      // Release the client back to the pool
      client.release();

      return true;
    } catch (error) {
      retries++;
      dbConnectionFailed(error);

      if (retries >= maxRetries) {
        console.error(
          `Maximum retries (${maxRetries}) reached. Exiting application.`
        );
        return false;
      }

      console.log(`Retrying in ${retryInterval / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
  }
};

// Function to execute a query
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

// This function implements the same interface as your old code
// but uses the pg Pool underneath
const getSql = () => {
  return {
    query,
    // You can add more methods here to match your use cases
  };
};

export { pool, query, getSql, checkDbConnection };
