import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createBranch = async (
  company_id,
  name,
  admin_uid,
  phone,
  email,
  address,
  location_latitude,
  location_longitude
) => {
  try {
    const result = await query(
      "INSERT INTO Branch (company_id, name, admin_uid, phone, email, address, location_latitude, location_longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        company_id,
        name,
        admin_uid,
        phone,
        email,
        address,
        location_latitude,
        location_longitude,
      ]
    );
    return { message: "Branch added successfully", branch: result.rows[0] };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchBranches = async () => {
  try {
    const result = await query("SELECT * FROM Branch", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchBranchesByCompany = async (company_id) => {
  try {
    const result = await query("SELECT * FROM Branch WHERE company_id = $1", [
      company_id,
    ]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchBranch = async (id) => {
  try {
    const result = await query("SELECT * FROM Branch WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editBranch = async (
  id,
  company_id,
  name,
  admin_uid,
  phone,
  email,
  address,
  location_latitude,
  location_longitude
) => {
  try {
    await query(
      "UPDATE Branch SET company_id = $1, name = $2, admin_uid = $3, phone = $4, email = $5, address = $6, location_latitude = $7, location_longitude = $8 WHERE id = $9",
      [
        company_id,
        name,
        admin_uid,
        phone,
        email,
        address,
        location_latitude,
        location_longitude,
        id,
      ]
    );
    return { message: "Branch updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteBranch = async (id) => {
  try {
    await query("DELETE FROM Branch WHERE id = $1", [id]);
    return { message: "Branch deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const BranchServices = {
  createBranch,
  fetchBranches,
  fetchBranchesByCompany,
  fetchBranch,
  editBranch,
  deleteBranch,
};

export default BranchServices;
