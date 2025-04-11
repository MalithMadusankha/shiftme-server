import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

// Assign an employee to a shift
const assignShiftToEmployee = async (employee_id, shift_id) => {
  try {
    const result = await query(
      `INSERT INTO Employee_Shift (employee_id, shift_id) 
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING
       RETURNING *`,
      [employee_id, shift_id]
    );

    return result.rows[0] || { message: "Already assigned" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

// Unassign a shift from an employee
const unassignShiftFromEmployee = async (employee_id, shift_id) => {
  try {
    const result = await query(
      `DELETE FROM Employee_Shift 
       WHERE employee_id = $1 AND shift_id = $2 
       RETURNING *`,
      [employee_id, shift_id]
    );

    return result.rows[0] || { message: "No assignment found" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

// Get all shifts assigned to an employee
const getShiftsByEmployee = async (employee_id) => {
  try {
    const result = await query(
      `SELECT s.* 
       FROM Shift s 
       JOIN Employee_Shift es ON s.id = es.shift_id 
       WHERE es.employee_id = $1`,
      [employee_id]
    );

    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

// Get all employees assigned to a shift
const getEmployeesByShift = async (shift_id) => {
  try {
    const result = await query(
      `SELECT e.*, u.name, u.email, u.phone 
       FROM Employee e 
       JOIN users u ON e.uid = u.uid
       JOIN Employee_Shift es ON e.emp_no = es.employee_id 
       WHERE es.shift_id = $1`,
      [shift_id]
    );

    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const EmployeeShiftService = {
  assignShiftToEmployee,
  unassignShiftFromEmployee,
  getShiftsByEmployee,
  getEmployeesByShift,
};

export { EmployeeShiftService };
