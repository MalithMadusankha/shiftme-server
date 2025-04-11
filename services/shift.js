import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createShift = async (name, branch_id) => {
  try {
    const result = await query(
      "INSERT INTO Shift (name, branch_id) VALUES ($1, $2) RETURNING *",
      [name, branch_id]
    );
    return { message: "Shift created successfully", shift: result.rows[0] };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchShifts = async () => {
  try {
    const result = await query("SELECT * FROM Shift", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchShiftsByBranch = async (branch_id) => {
  try {
    const result = await query("SELECT * FROM Shift WHERE branch_id = $1", [
      branch_id,
    ]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchShift = async (id) => {
  try {
    const result = await query("SELECT * FROM Shift WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editShift = async (id, name, branch_id) => {
  try {
    await query("UPDATE Shift SET name = $1, branch_id = $2 WHERE id = $3", [
      name,
      branch_id,
      id,
    ]);
    return { message: "Shift updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteShift = async (id) => {
  try {
    await query("DELETE FROM Shift WHERE id = $1", [id]);
    return { message: "Shift deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const ShiftServices = {
  createShift,
  fetchShifts,
  fetchShiftsByBranch,
  fetchShift,
  editShift,
  deleteShift,
};

export default ShiftServices;
