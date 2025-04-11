import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";
const createUser = async (
  uid,
  role,
  name,
  email,
  phone,
  address,
  location_latitude,
  location_longitude
) => {
  try {
    await query(
      `INSERT INTO users (uid, role, name, email, phone, address, location_latitude, location_longitude) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        uid,
        role,
        name,
        email,
        phone,
        address,
        location_latitude,
        location_longitude,
      ]
    );
    return { message: "User added successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchUsers = async () => {
  try {
    const result = await query("SELECT * FROM users", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    await query("DELETE FROM users WHERE id = $1", [id]);
    return { message: "User deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editUser = async (
  id,
  name,
  phone,
  address,
  location_latitude,
  location_longitude
) => {
  try {
    await query(
      `UPDATE users 
       SET name = $1, phone = $2, address = $3, location_latitude = $4, location_longitude = $5
       WHERE id = $6`,
      [name, phone, address, location_latitude, location_longitude, id]
    );
    return { message: "User updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchUser = async (id) => {
  try {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const UserServices = {
  createUser,
  fetchUsers,
  deleteUser,
  editUser,
  fetchUser,
};

export default UserServices;
