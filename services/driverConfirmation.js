import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createConfirmation = async (schedule_id, status = "Pending") => {
  try {
    await query(
      `INSERT INTO Driver_Transport_Confirmation (schedule_id, status)
       VALUES ($1, $2)`,
      [schedule_id, status]
    );
    return { message: "Driver transport confirmation added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchConfirmations = async () => {
  try {
    const result = await query(
      "SELECT * FROM Driver_Transport_Confirmation",
      []
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchConfirmation = async (id) => {
  try {
    const result = await query(
      "SELECT * FROM Driver_Transport_Confirmation WHERE id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const updateConfirmationStatus = async (id, status) => {
  try {
    await query(
      `UPDATE Driver_Transport_Confirmation 
       SET status = $1 
       WHERE id = $2`,
      [status, id]
    );
    return { message: "Confirmation status updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteConfirmation = async (id) => {
  try {
    await query("DELETE FROM Driver_Transport_Confirmation WHERE id = $1", [
      id,
    ]);
    return { message: "Confirmation deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const DriverTransportConfirmationServices = {
  createConfirmation,
  fetchConfirmations,
  fetchConfirmation,
  updateConfirmationStatus,
  deleteConfirmation,
};

export default DriverTransportConfirmationServices;
