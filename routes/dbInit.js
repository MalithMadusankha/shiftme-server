import express from "express";
import { createTables } from "../services/dbSetup.js"; // Import the function
import { apiCall } from "../helper/consoleLog.js";

const router = express.Router();

/**
 * @swagger
 * /api/init-db:
 *   get:
 *     summary: Initializes the database by creating required tables
 *     description: creates new tables if it is not existing.
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Database initialized successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "✅ Database initialized successfully!"
 *       500:
 *         description: Database initialization failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "❌ Database initialization failed!"
 *                 error:
 *                   type: string
 *                   example: "Database error details..."
 */

router.get("/init-db", async (req, res) => {
  apiCall("Create Tables");
  try {
    await createTables();
    res.status(200).json({ message: "✅ Table creation successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "❌ Table creation failed!",
      error: error.message,
    });
  }
});

export default router;
