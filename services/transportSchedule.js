import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createSchedule = async (
  branch_id,
  shift_id,
  driver_id,
  vehicle_id,
  route,
  schedule_start_date,
  schedule_end_date
) => {
  try {
    await query(
      `INSERT INTO Transport_Schedule (
        branch_id, shift_id, driver_id, vehicle_id, route, schedule_start_date, schedule_end_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        branch_id,
        shift_id,
        driver_id,
        vehicle_id,
        route,
        schedule_start_date,
        schedule_end_date,
      ]
    );
    return { message: "Transport schedule added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchSchedules = async () => {
  try {
    const result = await query("SELECT * FROM Transport_Schedule", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchSchedule = async (id) => {
  try {
    const result = await query(
      "SELECT * FROM Transport_Schedule WHERE id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editSchedule = async (
  id,
  branch_id,
  shift_id,
  driver_id,
  vehicle_id,
  route,
  schedule_start_date,
  schedule_end_date
) => {
  try {
    await query(
      `UPDATE Transport_Schedule 
       SET branch_id = $1, shift_id = $2, driver_id = $3, vehicle_id = $4, 
           route = $5, schedule_start_date = $6, schedule_end_date = $7
       WHERE id = $8`,
      [
        branch_id,
        shift_id,
        driver_id,
        vehicle_id,
        route,
        schedule_start_date,
        schedule_end_date,
        id,
      ]
    );
    return { message: "Transport schedule updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteSchedule = async (id) => {
  try {
    await query("DELETE FROM Transport_Schedule WHERE id = $1", [id]);
    return { message: "Transport schedule deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const TransportScheduleServices = {
  createSchedule,
  fetchSchedules,
  fetchSchedule,
  editSchedule,
  deleteSchedule,
};

export default TransportScheduleServices;
