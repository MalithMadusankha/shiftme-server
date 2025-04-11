import { Router } from "express";
import DriverServices from "../services/driver.js";
import { apiCall } from "../helper/consoleLog.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: Driver Management
 */

/**
 * @swagger
 * /driver:
 *   post:
 *     summary: Create a new driver
 *     tags: [Driver]
 *     description: Add a new driver to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 example: firebase123abc
 *               driving_license_number:
 *                 type: string
 *                 example: ABC123456
 *               nic_number:
 *                 type: string
 *                 example: 123456789V
 *               photo:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: The driver was created successfully
 *       400:
 *         description: Bad Request if data is incomplete or invalid
 */
router.post("/", async (req, res) => {
  apiCall("Creating a new driver");
  const { uid, driving_license_number, nic_number, photo } = req.body;

  const response = await DriverServices.createDriver(
    uid,
    driving_license_number,
    nic_number,
    photo
  );

  if (response.error) {
    return res.status(400).json(response);
  }

  res.status(201).json(response);
});

/**
 * @swagger
 * /driver:
 *   get:
 *     summary: Get all drivers
 *     tags: [Driver]
 *     description: Retrieve a list of all drivers from the database
 *     responses:
 *       200:
 *         description: A list of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                     example: firebase123abc
 *                   driving_license_number:
 *                     type: string
 *                     example: ABC123456
 *                   nic_number:
 *                     type: string
 *                     example: 123456789V
 *                   photo:
 *                     type: string
 *                     example: https://example.com/photo.jpg
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all drivers");
  const response = await DriverServices.fetchDrivers();
  res.json(response);
});

/**
 * @swagger
 * /driver/{id}:
 *   get:
 *     summary: Get a driver by ID
 *     tags: [Driver]
 *     description: Retrieve a specific driver from the database by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A driver object
 *       404:
 *         description: Driver not found
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching a driver by ID");
  const { id } = req.params;
  const response = await DriverServices.fetchDriver(id);

  if (!response || response.error) {
    return res.status(404).json({ error: "Driver not found" });
  }

  res.json(response);
});

/**
 * @swagger
 * /driver/nic/{nic_number}:
 *   get:
 *     summary: Get a driver by NIC number
 *     tags: [Driver]
 *     description: Retrieve a specific driver from the database by their NIC number
 *     parameters:
 *       - name: nic_number
 *         in: path
 *         required: true
 *         description: The NIC number of the driver to fetch
 *         schema:
 *           type: string
 *           example: 123456789V
 *     responses:
 *       200:
 *         description: A driver object
 *       404:
 *         description: Driver not found
 */
router.get("/nic/:nic_number", async (req, res) => {
  apiCall("Fetching a driver by NIC number");
  const { nic_number } = req.params;
  const response = await DriverServices.fetchDriverByNIC(nic_number);

  if (!response || response.error) {
    return res.status(404).json({ error: "Driver not found" });
  }

  res.json(response);
});

/**
 * @swagger
 * /driver/license/{driving_license_number}:
 *   get:
 *     summary: Get a driver by driving license number
 *     tags: [Driver]
 *     description: Retrieve a specific driver from the database by their driving license number
 *     parameters:
 *       - name: driving_license_number
 *         in: path
 *         required: true
 *         description: The driving license number of the driver to fetch
 *         schema:
 *           type: string
 *           example: ABC123456
 *     responses:
 *       200:
 *         description: A driver object
 *       404:
 *         description: Driver not found
 */
router.get("/license/:driving_license_number", async (req, res) => {
  apiCall("Fetching a driver by driving license number");
  const { driving_license_number } = req.params;
  const response = await DriverServices.fetchDriverByLicense(
    driving_license_number
  );

  if (!response || response.error) {
    return res.status(404).json({ error: "Driver not found" });
  }

  res.json(response);
});

/**
 * @swagger
 * /driver/{id}:
 *   put:
 *     summary: Update a driver's information
 *     tags: [Driver]
 *     description: Modify the details of an existing driver by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver to update
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
 *               driving_license_number:
 *                 type: string
 *                 example: ABC123456
 *               nic_number:
 *                 type: string
 *                 example: 123456789V
 *               photo:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *       400:
 *         description: Bad Request if data is invalid
 *       404:
 *         description: Driver not found
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating a driver");
  const { id } = req.params;
  const { driving_license_number, nic_number, photo } = req.body;

  const response = await DriverServices.editDriver(
    id,
    driving_license_number,
    nic_number,
    photo
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
 * /driver/{id}:
 *   delete:
 *     summary: Delete a driver by ID
 *     tags: [Driver]
 *     description: Remove a driver from the database by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the driver to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *       404:
 *         description: Driver not found
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting a driver");
  const { id } = req.params;
  const response = await DriverServices.deleteDriver(id);

  if (response.error) {
    return res.status(404).json(response);
  }

  res.json(response);
});

export default router;
