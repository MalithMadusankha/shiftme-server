import { Router } from "express";
import LiveLocationServices from "../services/liveLocation.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: LiveLocation
 *   description: Manage live location data
 */

/**
 * @swagger
 * /live-location:
 *   post:
 *     summary: Add a new live location for a trip
 *     tags: [LiveLocation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trip_id: { type: integer, example: 1 }
 *               driver_location_latitude: { type: number, example: 6.9271 }
 *               driver_location_longitude: { type: number, example: 79.8612 }
 *     responses:
 *       201: { description: Live location added }
 *       400: { description: Adding location failed }
 */
router.post("/", async (req, res) => {
  apiCall("Adding live location");
  const { trip_id, driver_location_latitude, driver_location_longitude } =
    req.body;
  const response = await LiveLocationServices.createLiveLocation(
    trip_id,
    driver_location_latitude,
    driver_location_longitude
  );
  if (response.error) return res.status(400).json(response);
  res.status(201).json(response);
});

/**
 * @swagger
 * /live-location:
 *   get:
 *     summary: Get all live location records
 *     tags: [LiveLocation]
 *     responses:
 *       200: { description: List of live locations }
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all live locations");
  const response = await LiveLocationServices.fetchLiveLocations();
  res.json(response);
});

/**
 * @swagger
 * /live-location/{id}:
 *   get:
 *     summary: Get a live location by ID
 *     tags: [LiveLocation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Live location found }
 *       404: { description: Location not found }
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching live location by ID");
  const response = await LiveLocationServices.fetchLiveLocationById(
    req.params.id
  );
  if (response.error || response.length === 0)
    return res.status(404).json({ error: "Live location not found" });
  res.json(response);
});

/**
 * @swagger
 * /live-location/trip/{trip_id}:
 *   get:
 *     summary: Get live locations for a specific trip
 *     tags: [LiveLocation]
 *     parameters:
 *       - name: trip_id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of live locations for the trip }
 *       404: { description: No data found for trip }
 */
router.get("/trip/:trip_id", async (req, res) => {
  apiCall("Fetching live locations by trip ID");
  const response = await LiveLocationServices.fetchLiveLocationsByTrip(
    req.params.trip_id
  );
  if (response.error || response.length === 0)
    return res
      .status(404)
      .json({ error: "No live location data found for the trip" });
  res.json(response);
});

/**
 * @swagger
 * /live-location/{id}:
 *   delete:
 *     summary: Delete a live location by ID
 *     tags: [LiveLocation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Live location deleted }
 *       404: { description: Live location not found }
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting live location");
  const response = await LiveLocationServices.deleteLiveLocation(req.params.id);
  if (response.error) return res.status(404).json(response);
  res.json(response);
});

export default router;
