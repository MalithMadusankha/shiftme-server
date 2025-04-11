import { Router } from "express";
import CompanyServices from "../services/company.js";
import { apiCall } from "../helper/consoleLog.js";
const router = Router();

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a new company
 *     description: Add a new company to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Example Company
 *               shortName:
 *                 type: string
 *                 example: ExCo
 *               address:
 *                 type: string
 *                 example: 123 Main St, City, Country
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               email:
 *                 type: string
 *                 example: info@example.com
 *     responses:
 *       201:
 *         description: The company was created successfully
 *       400:
 *         description: Bad Request if data is incomplete
 */
router.post("/", async (req, res) => {
  apiCall("Creating a new company");
  const { name, shortName, address, phone, email } = req.body;
  const response = await CompanyServices.createCompany(
    name,
    shortName,
    address,
    phone,
    email
  );
  res.status(201).json(response);
});

/**
 * @swagger
 * /company:
 *   get:
 *     summary: Get all companies
 *     description: Retrieve a list of all companies from the database
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Example Company
 *                   shortName:
 *                     type: string
 *                     example: ExCo
 *                   address:
 *                     type: string
 *                     example: 123 Main St, City, Country
 *                   phone:
 *                     type: string
 *                     example: +1234567890
 *                   email:
 *                     type: string
 *                     example: info@example.com
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all companies");
  const response = await CompanyServices.fetchCompanies();
  res.json(response);
});

/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     description: Remove a company from the database using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting a company");
  const { id } = req.params;
  const response = await CompanyServices.deleteCompany(id);
  res.json(response);
});

/**
 * @swagger
 * /company/{id}:
 *   put:
 *     summary: Update a company's information
 *     description: Modify the details of an existing company by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Company Name
 *               shortName:
 *                 type: string
 *                 example: NewCo
 *               address:
 *                 type: string
 *                 example: 456 Oak St, City, Country
 *               phone:
 *                 type: string
 *                 example: +9876543210
 *               email:
 *                 type: string
 *                 example: newinfo@example.com
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Bad Request if data is incomplete
 *       404:
 *         description: Company not found
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating a company");
  const { id } = req.params;
  const { name, shortName, address, phone, email } = req.body;
  const response = await CompanyServices.editCompany(
    id,
    name,
    shortName,
    address,
    phone,
    email
  );
  res.json(response);
});

/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get a company by ID
 *     description: Retrieve a specific company from the database by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A company object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Example Company
 *                 shortName:
 *                   type: string
 *                   example: ExCo
 *                 address:
 *                   type: string
 *                   example: 123 Main St, City, Country
 *                 phone:
 *                   type: string
 *                   example: +1234567890
 *                 email:
 *                   type: string
 *                   example: info@example.com
 *       404:
 *         description: Company not found
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching a company by ID");
  const { id } = req.params;
  const response = await CompanyServices.fetchCompany(id);
  res.json(response);
});

export default router;
