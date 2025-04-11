import { Router } from "express";
import TransportScheduleServices from "../services/transportSchedule.js";
import { apiCall } from "../helper/consoleLog.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transport Schedule
 *   description: Transport Schedule Management
 */

/**
 * @swagger
 * /transport-schedule:
 *   post:
 *     summary: Create a new transport schedule
 *     tags: [Transport Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branch_id: { type: integer, example: 1 }
 *               shift_id: { type: integer, example: 2 }
 *               driver_id: { type: integer, example: 3 }
 *               vehicle_id: { type: integer, example: 4 }
 *               route: { type: string, example: "Route A" }
 *               schedule_start_date: { type: string, example: "2025-04-15" }
 *               schedule_end_date: { type: string, example: "2025-04-30" }
 *     responses:
 *       201: { description: Transport schedule created }
 *       400: { description: Bad request }
 */
router.post("/", async (req, res) => {
  apiCall("Creating transport schedule");
  const {
    branch_id,
    shift_id,
    driver_id,
    vehicle_id,
    route,
    schedule_start_date,
    schedule_end_date,
  } = req.body;

  const response = await TransportScheduleServices.createSchedule(
    branch_id,
    shift_id,
    driver_id,
    vehicle_id,
    route,
    schedule_start_date,
    schedule_end_date
  );

  if (response.error) return res.status(400).json(response);
  res.status(201).json(response);
});

/**
 * @swagger
 * /transport-schedule:
 *   get:
 *     summary: Get all transport schedules
 *     tags: [Transport Schedule]
 *     responses:
 *       200: { description: List of transport schedules }
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all transport schedules");
  const response = await TransportScheduleServices.fetchSchedules();
  res.json(response);
});

/**
 * @swagger
 * /transport-schedule/{id}:
 *   get:
 *     summary: Get transport schedule by ID
 *     tags: [Transport Schedule]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Transport schedule found }
 *       404: { description: Schedule not found }
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching transport schedule by ID");
  const response = await TransportScheduleServices.fetchSchedule(req.params.id);
  if (response.error || response.length === 0)
    return res.status(404).json({ error: "Schedule not found" });
  res.json(response);
});

/**
 * @swagger
 * /transport-schedule/{id}:
 *   put:
 *     summary: Update transport schedule by ID
 *     tags: [Transport Schedule]
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
 *               branch_id: { type: integer, example: 1 }
 *               shift_id: { type: integer, example: 2 }
 *               driver_id: { type: integer, example: 3 }
 *               vehicle_id: { type: integer, example: 4 }
 *               route: { type: string, example: "Route B" }
 *               schedule_start_date: { type: string, example: "2025-05-01" }
 *               schedule_end_date: { type: string, example: "2025-05-15" }
 *     responses:
 *       200: { description: Transport schedule updated }
 *       400: { description: Bad request }
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating transport schedule");
  const { id } = req.params;
  const {
    branch_id,
    shift_id,
    driver_id,
    vehicle_id,
    route,
    schedule_start_date,
    schedule_end_date,
  } = req.body;

  const response = await TransportScheduleServices.editSchedule(
    id,
    branch_id,
    shift_id,
    driver_id,
    vehicle_id,
    route,
    schedule_start_date,
    schedule_end_date
  );

  if (response.error) return res.status(400).json(response);
  res.json(response);
});

/**
 * @swagger
 * /transport-schedule/{id}:
 *   delete:
 *     summary: Delete transport schedule by ID
 *     tags: [Transport Schedule]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Transport schedule deleted }
 *       404: { description: Schedule not found }
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting transport schedule");
  const response = await TransportScheduleServices.deleteSchedule(
    req.params.id
  );
  if (response.error) return res.status(404).json(response);
  res.json(response);
});

export default router;
