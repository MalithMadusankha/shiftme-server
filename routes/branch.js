import { Router } from "express";
import BranchServices from "../services/branch.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Branch
 *   description: Branch Management
 */

/**
 * @swagger
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     description: Add a new branch to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Downtown Branch
 *               admin_uid:
 *                 type: string
 *                 example: auth0|user123
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               email:
 *                 type: string
 *                 example: downtown@example.com
 *               address:
 *                 type: string
 *                 example: 123 Main St, City, Country
 *               location_latitude:
 *                 type: number
 *                 format: decimal
 *                 example: 40.712776
 *               location_longitude:
 *                 type: number
 *                 format: decimal
 *                 example: -74.005974
 *     responses:
 *       201:
 *         description: The branch was created successfully
 *       400:
 *         description: Bad Request if data is incomplete
 */
router.post("/", async (req, res) => {
  apiCall("Creating a new branch");
  const {
    company_id,
    name,
    admin_uid,
    phone,
    email,
    address,
    location_latitude,
    location_longitude,
  } = req.body;
  const response = await BranchServices.createBranch(
    company_id,
    name,
    admin_uid,
    phone,
    email,
    address,
    location_latitude,
    location_longitude
  );
  res.status(201).json(response);
});

/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch]
 *     description: Retrieve a list of all branches from the database
 *     responses:
 *       200:
 *         description: A list of branches
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
 *                   company_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Downtown Branch
 *                   admin_uid:
 *                     type: string
 *                     example: auth0|user123
 *                   phone:
 *                     type: string
 *                     example: +1234567890
 *                   email:
 *                     type: string
 *                     example: downtown@example.com
 *                   address:
 *                     type: string
 *                     example: 123 Main St, City, Country
 *                   location_latitude:
 *                     type: number
 *                     format: decimal
 *                     example: 40.712776
 *                   location_longitude:
 *                     type: number
 *                     format: decimal
 *                     example: -74.005974
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-01T00:00:00Z
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all branches");
  const response = await BranchServices.fetchBranches();
  res.json(response);
});

/**
 * @swagger
 * /branch/company/{company_id}:
 *   get:
 *     summary: Get all branches for a specific company
 *     tags: [Branch]
 *     description: Retrieve a list of all branches belonging to a company
 *     parameters:
 *       - name: company_id
 *         in: path
 *         required: true
 *         description: The ID of the company to fetch branches for
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of branches for the company
 *       404:
 *         description: Company not found
 */
router.get("/company/:company_id", async (req, res) => {
  apiCall("Fetching branches for a company");
  const { company_id } = req.params;
  const response = await BranchServices.fetchBranchesByCompany(company_id);
  res.json(response);
});

/**
 * @swagger
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branch]
 *     description: Remove a branch from the database using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the branch to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting a branch");
  const { id } = req.params;
  const response = await BranchServices.deleteBranch(id);
  res.json(response);
});

/**
 * @swagger
 * /branch/{id}:
 *   put:
 *     summary: Update a branch's information
 *     tags: [Branch]
 *     description: Modify the details of an existing branch by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the branch to update
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
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Updated Branch Name
 *               admin_uid:
 *                 type: string
 *                 example: auth0|newadmin456
 *               phone:
 *                 type: string
 *                 example: +9876543210
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               address:
 *                 type: string
 *                 example: 456 Oak St, City, Country
 *               location_latitude:
 *                 type: number
 *                 format: decimal
 *                 example: 41.878113
 *               location_longitude:
 *                 type: number
 *                 format: decimal
 *                 example: -87.629799
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Bad Request if data is incomplete
 *       404:
 *         description: Branch not found
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating a branch");
  const { id } = req.params;
  const {
    company_id,
    name,
    admin_uid,
    phone,
    email,
    address,
    location_latitude,
    location_longitude,
  } = req.body;
  const response = await BranchServices.editBranch(
    id,
    company_id,
    name,
    admin_uid,
    phone,
    email,
    address,
    location_latitude,
    location_longitude
  );
  res.json(response);
});

/**
 * @swagger
 * /branch/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branch]
 *     description: Retrieve a specific branch from the database by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the branch to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A branch object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 company_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Downtown Branch
 *                 admin_uid:
 *                   type: string
 *                   example: auth0|user123
 *                 phone:
 *                   type: string
 *                   example: +1234567890
 *                 email:
 *                   type: string
 *                   example: downtown@example.com
 *                 address:
 *                   type: string
 *                   example: 123 Main St, City, Country
 *                 location_latitude:
 *                   type: number
 *                   format: decimal
 *                   example: 40.712776
 *                 location_longitude:
 *                   type: number
 *                   format: decimal
 *                   example: -74.005974
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-01-01T00:00:00Z
 *       404:
 *         description: Branch not found
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching a branch by ID");
  const { id } = req.params;
  const response = await BranchServices.fetchBranch(id);
  res.json(response);
});

export default router;
