import { Router } from "express";
import TripServices from "../services/trip.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: Manage trip records
 */

/**
 * @swagger
 * /trip:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trip]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule_id: { type: integer, example: 3 }
 *               start_time: { type: string, format: date-time, example: "2025-04-11T08:00:00Z" }
 *               end_time: { type: string, format: date-time, example: "2025-04-11T09:00:00Z" }
 *               mileage: { type: number, example: 12.5 }
 *               status: { type: string, example: "Completed" }
 *     responses:
 *       201: { description: Trip created }
 *       400: { description: Trip creation failed }
 */
router.post("/", async (req, res) => {
  apiCall("Creating trip");
  const { schedule_id, start_time, end_time, mileage, status } = req.body;
  const response = await TripServices.createTrip(
    schedule_id,
    start_time,
    end_time,
    mileage,
    status
  );
  if (response.error) return res.status(400).json(response);
  res.status(201).json(response);
});

/**
 * @swagger
 * /trip:
 *   get:
 *     summary: Get all trips
 *     tags: [Trip]
 *     responses:
 *       200: { description: List of trips }
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all trips");
  const response = await TripServices.fetchTrips();
  res.json(response);
});

/**
 * @swagger
 * /trip/{id}:
 *   get:
 *     summary: Get a trip by ID
 *     tags: [Trip]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Trip found }
 *       404: { description: Trip not found }
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching trip by ID");
  const response = await TripServices.fetchTrip(req.params.id);
  if (response.error || response.length === 0)
    return res.status(404).json({ error: "Trip not found" });
  res.json(response);
});

/**
 * @swagger
 * /trip/{id}:
 *   put:
 *     summary: Update a trip by ID
 *     tags: [Trip]
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
 *               start_time: { type: string, format: date-time, example: "2025-04-11T08:00:00Z" }
 *               end_time: { type: string, format: date-time, example: "2025-04-11T09:00:00Z" }
 *               mileage: { type: number, example: 13.7 }
 *               status: { type: string, example: "In Progress" }
 *     responses:
 *       200: { description: Trip updated }
 *       400: { description: Update failed }
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating trip");
  const { start_time, end_time, mileage, status } = req.body;
  const response = await TripServices.updateTrip(
    req.params.id,
    start_time,
    end_time,
    mileage,
    status
  );
  if (response.error) return res.status(400).json(response);
  res.json(response);
});

/**
 * @swagger
 * /trip/{id}:
 *   delete:
 *     summary: Delete a trip by ID
 *     tags: [Trip]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Trip deleted }
 *       404: { description: Trip not found }
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting trip");
  const response = await TripServices.deleteTrip(req.params.id);
  if (response.error) return res.status(404).json(response);
  res.json(response);
});

export default router;
