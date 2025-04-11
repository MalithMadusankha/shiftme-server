import { Router } from "express";
import VehicleServices from "../services/vehicle.js";
import { apiCall } from "../helper/consoleLog.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: Vehicle Management
 */

/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicle]
 *     description: Add a new vehicle to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Toyota Corolla
 *               photo:
 *                 type: string
 *                 example: photo_url
 *               number_plate:
 *                 type: string
 *                 example: ABC-1234
 *     responses:
 *       201:
 *         description: The vehicle was added successfully
 *       400:
 *         description: Bad Request if data is incomplete or invalid
 */
router.post("/", async (req, res) => {
  apiCall("Creating a new vehicle");
  const { name, photo, number_plate } = req.body;

  const response = await VehicleServices.createVehicle(
    name,
    photo,
    number_plate
  );

  if (response.error) {
    return res.status(400).json(response);
  }

  res.status(201).json(response);
});

/**
 * @swagger
 * /vehicle:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicle]
 *     description: Retrieve a list of all vehicles from the database
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Toyota Corolla
 *                   photo:
 *                     type: string
 *                     example: photo_url
 *                   number_plate:
 *                     type: string
 *                     example: ABC-1234
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all vehicles");
  const response = await VehicleServices.fetchVehicles();
  res.json(response);
});

/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicle]
 *     description: Retrieve a specific vehicle from the database by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A vehicle object
 *       404:
 *         description: Vehicle not found
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching a vehicle by ID");
  const { id } = req.params;
  const response = await VehicleServices.fetchVehicle(id);

  if (response.error || response.length === 0) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.json(response);
});

/**
 * @swagger
 * /vehicle/{id}:
 *   put:
 *     summary: Update a vehicle's information
 *     tags: [Vehicle]
 *     description: Modify the details of an existing vehicle by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Toyota Corolla
 *               photo:
 *                 type: string
 *                 example: updated_photo_url
 *               number_plate:
 *                 type: string
 *                 example: ABC-4321
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Bad Request if data is invalid
 *       404:
 *         description: Vehicle not found
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating a vehicle");
  const { id } = req.params;
  const { name, photo, number_plate } = req.body;

  const response = await VehicleServices.editVehicle(
    id,
    name,
    photo,
    number_plate
  );

  if (response.error) {
    if (response.error.includes("not found")) {
      return res.status(404).json(response);
    }
    return res.status(400).json(response);
  }

  res.json(response);
});

/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicle]
 *     description: Remove a vehicle from the database using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the vehicle to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting a vehicle");
  const { id } = req.params;
  const response = await VehicleServices.deleteVehicle(id);

  if (response.error) {
    return res.status(404).json(response);
  }

  res.json(response);
});

export default router;
