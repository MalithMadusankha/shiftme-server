import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createTrip = async (
  schedule_id,
  start_time,
  end_time,
  mileage,
  status
) => {
  try {
    await query(
      `INSERT INTO Trip (schedule_id, start_time, end_time, mileage, status)
       VALUES ($1, $2, $3, $4, $5)`,
      [schedule_id, start_time, end_time, mileage, status]
    );
    return { message: "Trip created successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchTrips = async () => {
  try {
    const result = await query("SELECT * FROM Trip", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchTrip = async (id) => {
  try {
    const result = await query("SELECT * FROM Trip WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const updateTrip = async (id, start_time, end_time, mileage, status) => {
  try {
    await query(
      `UPDATE Trip 
       SET start_time = $1, end_time = $2, mileage = $3, status = $4 
       WHERE id = $5`,
      [start_time, end_time, mileage, status, id]
    );
    return { message: "Trip updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteTrip = async (id) => {
  try {
    await query("DELETE FROM Trip WHERE id = $1", [id]);
    return { message: "Trip deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const TripServices = {
  createTrip,
  fetchTrips,
  fetchTrip,
  updateTrip,
  deleteTrip,
};

export default TripServices;
