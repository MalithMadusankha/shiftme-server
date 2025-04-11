import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createTripTracker = async (live_location_id, emp_no, status, type) => {
  try {
    await query(
      `INSERT INTO Trip_Tracker (live_location_id, emp_no, status, type)
       VALUES ($1, $2, $3, $4)`,
      [live_location_id, emp_no, status, type]
    );
    return { message: "Trip tracker entry created successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchTripTrackers = async () => {
  try {
    const result = await query("SELECT * FROM Trip_Tracker", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchTripTrackerById = async (id) => {
  try {
    const result = await query("SELECT * FROM Trip_Tracker WHERE id = $1", [
      id,
    ]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchTripTrackersByEmp = async (emp_no) => {
  try {
    const result = await query("SELECT * FROM Trip_Tracker WHERE emp_no = $1", [
      emp_no,
    ]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteTripTracker = async (id) => {
  try {
    await query("DELETE FROM Trip_Tracker WHERE id = $1", [id]);
    return { message: "Trip tracker entry deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const TripTrackerServices = {
  createTripTracker,
  fetchTripTrackers,
  fetchTripTrackerById,
  fetchTripTrackersByEmp,
  deleteTripTracker,
};

export default TripTrackerServices;
