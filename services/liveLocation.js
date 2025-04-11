import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createLiveLocation = async (
  trip_id,
  driver_location_latitude,
  driver_location_longitude
) => {
  try {
    await query(
      `INSERT INTO Live_Location (trip_id, driver_location_latitude, driver_location_longitude)
       VALUES ($1, $2, $3)`,
      [trip_id, driver_location_latitude, driver_location_longitude]
    );
    return { message: "Live location added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchLiveLocations = async () => {
  try {
    const result = await query("SELECT * FROM Live_Location", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchLiveLocationById = async (id) => {
  try {
    const result = await query("SELECT * FROM Live_Location WHERE id = $1", [
      id,
    ]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchLiveLocationsByTrip = async (trip_id) => {
  try {
    const result = await query(
      "SELECT * FROM Live_Location WHERE trip_id = $1 ORDER BY created_at DESC",
      [trip_id]
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteLiveLocation = async (id) => {
  try {
    await query("DELETE FROM Live_Location WHERE id = $1", [id]);
    return { message: "Live location deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const LiveLocationServices = {
  createLiveLocation,
  fetchLiveLocations,
  fetchLiveLocationById,
  fetchLiveLocationsByTrip,
  deleteLiveLocation,
};

export default LiveLocationServices;
