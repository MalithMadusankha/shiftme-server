import { query } from "../db.js";

const createUser = async (name, email) => {
  try {
    await query("INSERT INTO users (name, email) VALUES ($1, $2)", [
      name,
      email,
    ]);
    return { message: "User added successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const fetchUsers = async () => {
  try {
    const result = await query("SELECT * FROM users", []);
    return result.rows;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    await query("DELETE FROM users WHERE id = $1", [id]);
    return { message: "User deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const editUser = async (id, name, email) => {
  try {
    await query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
      name,
      email,
      id,
    ]);
    return { message: "User updated successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const fetchUser = async (id) => {
  try {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    return { error: error.message };
  }
};

const userServices = {
  createUser,
  fetchUsers,
  deleteUser,
  editUser,
  fetchUser,
};

export default userServices;
