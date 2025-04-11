import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createVehicle = async (name, photo, number_plate) => {
  try {
    await query(
      `INSERT INTO Vehicle (name, photo, number_plate) 
       VALUES ($1, $2, $3)`,
      [name, photo, number_plate]
    );
    return { message: "Vehicle added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchVehicles = async () => {
  try {
    const result = await query("SELECT * FROM Vehicle", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteVehicle = async (id) => {
  try {
    await query("DELETE FROM Vehicle WHERE id = $1", [id]);
    return { message: "Vehicle deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editVehicle = async (id, name, photo, number_plate) => {
  try {
    await query(
      `UPDATE Vehicle 
       SET name = $1, photo = $2, number_plate = $3
       WHERE id = $4`,
      [name, photo, number_plate, id]
    );
    return { message: "Vehicle updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchVehicle = async (id) => {
  try {
    const result = await query("SELECT * FROM Vehicle WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const VehicleServices = {
  createVehicle,
  fetchVehicles,
  deleteVehicle,
  editVehicle,
  fetchVehicle,
};

export default VehicleServices;
