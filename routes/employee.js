import { Router } from "express";
import { EmployeeServices } from "../services/employee.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee Management
 */

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     description: Add a new employee to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emp_no:
 *                 type: string
 *                 example: EMP123
 *               uid:
 *                 type: string
 *                 example: firebase123abc
 *               branch_id:
 *                 type: string
 *                 example: BR001
 *               name:
 *                 type: string
 *                 example: Alice Smith
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post("/", async (req, res) => {
  apiCall("Creating a new employee");
  const response = await EmployeeServices.createEmployee(req.body);
  res.status(201).json(response);
});

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Fetch all employees
 *     tags: [Employee]
 *     description: Retrieve all employees from the database
 *     responses:
 *       200:
 *         description: A list of employees
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all employees");
  const response = await EmployeeServices.fetchEmployees();
  res.json(response);
});

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     description: Delete an employee by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting an employee");
  const response = await EmployeeServices.deleteEmployee(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employee]
 *     description: Update employee details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Employee updated
 */
router.put("/:id", async (req, res) => {
  apiCall("Editing an employee");
  const response = await EmployeeServices.editEmployee(req.params.id, req.body);
  res.json(response);
});

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Fetch an employee by ID
 *     tags: [Employee]
 *     description: Retrieve employee details using the employee ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching employee by ID");
  const response = await EmployeeServices.fetchEmployee(req.params.id);
  res.json(response);
});

/**
 * @swagger
 * /employee/uid/{uid}:
 *   get:
 *     summary: Fetch employee by UID
 *     tags: [Employee]
 *     description: Retrieve employee details using the UID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee data
 */
router.get("/uid/:uid", async (req, res) => {
  apiCall("Fetching employee by UID");
  const response = await EmployeeServices.fetchEmployeeByUid(req.params.uid);
  res.json(response);
});

/**
 * @swagger
 * /employee/empno/{empNo}:
 *   get:
 *     summary: Fetch employee by Employee Number
 *     tags: [Employee]
 *     description: Retrieve employee details using the employee number
 *     parameters:
 *       - name: empNo
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee data
 */
router.get("/empno/:empNo", async (req, res) => {
  apiCall("Fetching employee by Employee Number");
  const response = await EmployeeServices.fetchEmployeeByEmpNo(
    req.params.empNo
  );
  res.json(response);
});

/**
 * @swagger
 * /employee/branch/{branchId}:
 *   get:
 *     summary: Fetch employees by Branch ID
 *     tags: [Employee]
 *     description: Retrieve all employees associated with a specific branch ID
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees in the branch
 */
router.get("/branch/:branchId", async (req, res) => {
  apiCall("Fetching employees by branch ID");
  const response = await EmployeeServices.fetchEmployeeByBranchId(
    req.params.branchId
  );
  res.json(response);
});

export default router;
