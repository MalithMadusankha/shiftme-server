import { Router } from "express";
import driverConfirmation from "../services/driverConfirmation.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Driver Transport Confirmation
 *   description: Manage driver transport confirmations
 */

/**
 * @swagger
 * /driver-confirmation:
 *   post:
 *     summary: Create a driver transport confirmation
 *     tags: [Driver Transport Confirmation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule_id: { type: integer, example: 1 }
 *               status: { type: string, example: "Pending" }
 *     responses:
 *       201: { description: Confirmation created }
 *       400: { description: Error creating confirmation }
 */
router.post("/", async (req, res) => {
  apiCall("Creating driver confirmation");
  const { schedule_id, status } = req.body;

  const response = await driverConfirmation.createConfirmation(
    schedule_id,
    status
  );

  if (response.error) return res.status(400).json(response);
  res.status(201).json(response);
});

/**
 * @swagger
 * /driver-confirmation:
 *   get:
 *     summary: Get all driver transport confirmations
 *     tags: [Driver Transport Confirmation]
 *     responses:
 *       200: { description: List of confirmations }
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all driver confirmations");
  const response = await driverConfirmation.fetchConfirmations();
  res.json(response);
});

/**
 * @swagger
 * /driver-confirmation/{id}:
 *   get:
 *     summary: Get driver confirmation by ID
 *     tags: [Driver Transport Confirmation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Confirmation found }
 *       404: { description: Confirmation not found }
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching driver confirmation by ID");
  const response = await driverConfirmation.fetchConfirmation(req.params.id);
  if (response.error || response.length === 0)
    return res.status(404).json({ error: "Confirmation not found" });
  res.json(response);
});

/**
 * @swagger
 * /driver-confirmation/{id}:
 *   put:
 *     summary: Update confirmation status by ID
 *     tags: [Driver Transport Confirmation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, example: "Accepted" }
 *     responses:
 *       200: { description: Confirmation status updated }
 *       400: { description: Update failed }
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating confirmation status");
  const { status } = req.body;
  const { id } = req.params;

  const response = await driverConfirmation.updateConfirmationStatus(
    id,
    status
  );

  if (response.error) return res.status(400).json(response);
  res.json(response);
});

/**
 * @swagger
 * /driver-confirmation/{id}:
 *   delete:
 *     summary: Delete driver confirmation by ID
 *     tags: [Driver Transport Confirmation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Confirmation deleted }
 *       404: { description: Confirmation not found }
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting driver confirmation");
  const response = await driverConfirmation.deleteConfirmation(req.params.id);
  if (response.error) return res.status(404).json(response);
  res.json(response);
});

export default router;
