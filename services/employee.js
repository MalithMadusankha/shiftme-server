import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createEmployee = async (emp_no, uid, branch_id) => {
  try {
    await query(
      `INSERT INTO Employee (emp_no, uid, branch_id) 

       VALUES ($1, $2, $3)`,

      [emp_no, uid, branch_id]
    );

    return { message: "Employee added successfully" };
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const fetchEmployees = async () => {
  try {
    const result = await query(
      `SELECT e.*, u.name, u.email, u.phone, b.name as branch_name 

       FROM Employee e 

       JOIN users u ON e.uid = u.uid 

       JOIN Branch b ON e.branch_id = b.id`,

      []
    );

    return result.rows;
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const deleteEmployee = async (emp_no) => {
  try {
    await query("DELETE FROM Employee WHERE emp_no = $1", [emp_no]);

    return { message: "Employee record deleted successfully" };
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const editEmployee = async (emp_no, branch_id) => {
  try {
    await query(
      `UPDATE Employee 

       SET branch_id = $1

       WHERE emp_no = $2`,

      [branch_id, emp_no]
    );

    return { message: "Employee updated successfully" };
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const fetchEmployee = async (emp_no) => {
  try {
    const result = await query(
      `SELECT e.*, u.name, u.email, u.phone, b.name as branch_name 

       FROM Employee e 

       JOIN users u ON e.uid = u.uid 

       JOIN Branch b ON e.branch_id = b.id

       WHERE e.emp_no = $1`,

      [emp_no]
    );

    return result.rows[0];
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const fetchEmployeeByUid = async (uid) => {
  try {
    const result = await query(
      `SELECT e.*, u.name, u.email, u.phone, b.name as branch_name 

       FROM Employee e 

       JOIN users u ON e.uid = u.uid 

       JOIN Branch b ON e.branch_id = b.id

       WHERE e.uid = $1`,

      [uid]
    );

    return result.rows[0];
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const fetchEmployeeByEmpNo = async (emp_no) => {
  try {
    const result = await query(
      `SELECT e.*, u.name, u.email, u.phone, b.name as branch_name 

       FROM Employee e 

       JOIN users u ON e.uid = u.uid 

       JOIN Branch b ON e.branch_id = b.id

       WHERE e.emp_no = $1`,

      [emp_no]
    );

    return result.rows[0];
  } catch (error) {
    errorLog(error.message);

    return { error: error.message };
  }
};

const fetchEmployeeByBranchId = async (branch_id) => {
  try {
    const result = await query(
      `SELECT e.*, u.name, u.email, u.phone, b.name as branch_name 
       FROM Employee e 
       JOIN users u ON e.uid = u.uid 
       JOIN Branch b ON e.branch_id = b.id
       WHERE e.branch_id = $1`,
      [branch_id]
    );

    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const EmployeeServices = {
  createEmployee,
  fetchEmployees,
  deleteEmployee,
  editEmployee,
  fetchEmployee,
  fetchEmployeeByUid,
  fetchEmployeeByEmpNo,
  fetchEmployeeByBranchId,
};

export { EmployeeServices };
