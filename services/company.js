import { query } from "../db.js";
import { errorLog } from "../helper/consoleLog.js";

const createCompany = async (name, shortName, address, phone, email) => {
  try {
    const result = await query(
      "INSERT INTO Company (name, short_name, address, phone, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, shortName, address, phone, email]
    );
    return { message: "Company added successfully", company: result.rows[0] };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchCompanies = async () => {
  try {
    const result = await query("SELECT * FROM Company", []);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const deleteCompany = async (id) => {
  try {
    await query("DELETE FROM Company WHERE id = $1", [id]);
    return { message: "Company deleted successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const editCompany = async (id, name, shortName, address, phone, email) => {
  try {
    await query(
      "UPDATE Company SET name = $1, short_name = $2, address = $3, phone = $4, email = $5 WHERE id = $6",
      [name, shortName, address, phone, email, id]
    );
    return { message: "Company updated successfully" };
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const fetchCompany = async (id) => {
  try {
    const result = await query("SELECT * FROM Company WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    errorLog(error.message);
    return { error: error.message };
  }
};

const CompanyServices = {
  createCompany,
  fetchCompanies,
  deleteCompany,
  editCompany,
  fetchCompany,
};

export default CompanyServices;
