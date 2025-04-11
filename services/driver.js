import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createDriver = async (uid, driving_license_number, nic_number, photo) => {
  try {
    await query(
      `INSERT INTO driver (uid, driving_license_number, nic_number, photo)
       VALUES ($1, $2, $3, $4)`,
      [uid, driving_license_number, nic_number, photo]
    );
    return { message: "Driver added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchDrivers = async () => {
  try {
    const result = await query("SELECT * FROM driver", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchDriver = async (id) => {
  try {
    const result = await query("SELECT * FROM driver WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchDriverByNIC = async (nic_number) => {
  try {
    const result = await query("SELECT * FROM driver WHERE nic_number = $1", [
      nic_number,
    ]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchDriverByLicense = async (driving_license_number) => {
  try {
    const result = await query(
      "SELECT * FROM driver WHERE driving_license_number = $1",
      [driving_license_number]
    );
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editDriver = async (id, driving_license_number, nic_number, photo) => {
  try {
    await query(
      `UPDATE driver 
       SET driving_license_number = $1, nic_number = $2, photo = $3
       WHERE id = $4`,
      [driving_license_number, nic_number, photo, id]
    );
    return { message: "Driver updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteDriver = async (id) => {
  try {
    await query("DELETE FROM driver WHERE id = $1", [id]);
    return { message: "Driver deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const DriverServices = {
  createDriver,
  fetchDrivers,
  fetchDriver,
  fetchDriverByNIC,
  fetchDriverByLicense,
  editDriver,
  deleteDriver,
};

export default DriverServices;
