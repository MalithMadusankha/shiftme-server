import { Router } from "express";
import TripTrackerServices from "../services/tripTracker.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TripTracker
 *   description: Manage trip tracking records
 */

/**
 * @swagger
 * /trip-tracker:
 *   post:
 *     summary: Create a new trip tracker entry
 *     tags: [TripTracker]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               live_location_id: { type: integer, example: 1 }
 *               emp_no: { type: string, example: "EMP123" }
 *               status: { type: string, example: "onboarded" }
 *               type: { type: string, example: "pickup" }
 *     responses:
 *       201: { description: Trip tracker entry created }
 *       400: { description: Creation failed }
 */
router.post("/", async (req, res) => {
  apiCall("Creating trip tracker entry");
  const { live_location_id, emp_no, status, type } = req.body;
  const response = await TripTrackerServices.createTripTracker(
    live_location_id,
    emp_no,
    status,
    type
  );
  if (response.error) return res.status(400).json(response);
  res.status(201).json(response);
});

/**
 * @swagger
 * /trip-tracker:
 *   get:
 *     summary: Get all trip tracker entries
 *     tags: [TripTracker]
 *     responses:
 *       200: { description: List of all trip tracker entries }
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all trip tracker entries");
  const response = await TripTrackerServices.fetchTripTrackers();
  res.json(response);
});

/**
 * @swagger
 * /trip-tracker/{id}:
 *   get:
 *     summary: Get a trip tracker entry by ID
 *     tags: [TripTracker]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Trip tracker entry found }
 *       404: { description: Not found }
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching trip tracker entry by ID");
  const response = await TripTrackerServices.fetchTripTrackerById(
    req.params.id
  );
  if (response.error || response.length === 0)
    return res.status(404).json({ error: "Trip tracker entry not found" });
  res.json(response);
});

/**
 * @swagger
 * /trip-tracker/employee/{emp_no}:
 *   get:
 *     summary: Get trip tracker entries by employee number
 *     tags: [TripTracker]
 *     parameters:
 *       - name: emp_no
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of trip tracker entries for the employee }
 *       404: { description: No entries found }
 */
router.get("/employee/:emp_no", async (req, res) => {
  apiCall("Fetching trip tracker entries by employee number");
  const response = await TripTrackerServices.fetchTripTrackersByEmp(
    req.params.emp_no
  );
  if (response.error || response.length === 0)
    return res
      .status(404)
      .json({ error: "No trip tracker entries found for the employee" });
  res.json(response);
});

/**
 * @swagger
 * /trip-tracker/{id}:
 *   delete:
 *     summary: Delete a trip tracker entry by ID
 *     tags: [TripTracker]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Trip tracker entry deleted }
 *       404: { description: Entry not found }
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting trip tracker entry");
  const response = await TripTrackerServices.deleteTripTracker(req.params.id);
  if (response.error) return res.status(404).json(response);
  res.json(response);
});

export default router;
