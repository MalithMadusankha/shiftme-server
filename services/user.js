import { sql } from "../db.js";

const createUser = async (name, email) => {
  try {
    await sql`INSERT INTO users (name, email) VALUES (${name}, ${email})`;
    return { message: "User added successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const fetchUsers = async () => {
  try {
    const users = await sql`SELECT * FROM users`;
    return users;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    return { message: "User deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const editUser = async (id, name, email) => {
  try {
    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`;
    return { message: "User updated successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const fetchUser = async (id) => {
  try {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`;
    return user;
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
