import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createEmployeeConfirmation = async (
  emp_no,
  schedule_id,
  confirmed_date,
  status = "Pending"
) => {
  try {
    await query(
      `INSERT INTO Employee_Transport_Confirmation 
      (emp_no, schedule_id, confirmed_date, status) 
      VALUES ($1, $2, $3, $4)`,
      [emp_no, schedule_id, confirmed_date, status]
    );
    return { message: "Employee transport confirmation added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchEmployeeConfirmations = async () => {
  try {
    const result = await query(
      "SELECT * FROM Employee_Transport_Confirmation",
      []
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchEmployeeConfirmation = async (id) => {
  try {
    const result = await query(
      "SELECT * FROM Employee_Transport_Confirmation WHERE id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const updateEmployeeConfirmation = async (id, confirmed_date, status) => {
  try {
    await query(
      `UPDATE Employee_Transport_Confirmation 
       SET confirmed_date = $1, status = $2 
       WHERE id = $3`,
      [confirmed_date, status, id]
    );
    return { message: "Employee transport confirmation updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteEmployeeConfirmation = async (id) => {
  try {
    await query("DELETE FROM Employee_Transport_Confirmation WHERE id = $1", [
      id,
    ]);
    return { message: "Employee transport confirmation deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const EmployeeTransportConfirmationServices = {
  createEmployeeConfirmation,
  fetchEmployeeConfirmations,
  fetchEmployeeConfirmation,
  updateEmployeeConfirmation,
  deleteEmployeeConfirmation,
};

export default EmployeeTransportConfirmationServices;
