import { Router } from "express";
import EmployeeTransportConfirmationServices from "../services/employeeConfirmation.js";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Employee Transport Confirmation
 *   description: Manage employee transport confirmations
 */

/**
 * @swagger
 * /employee-confirmation:
 *   post:
 *     summary: Create an employee transport confirmation
 *     tags: [Employee Transport Confirmation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emp_no: { type: string, example: "EMP001" }
 *               schedule_id: { type: integer, example: 2 }
 *               confirmed_date: { type: string, format: date, example: "2025-04-12" }
 *               status: { type: string, example: "Pending" }
 *     responses:
 *       201: { description: Confirmation created }
 *       400: { description: Error creating confirmation }
 */
router.post("/", async (req, res) => {
  apiCall("Creating employee confirmation");
  const { emp_no, schedule_id, confirmed_date, status } = req.body;

  const response =
    await EmployeeTransportConfirmationServices.createEmployeeConfirmation(
      emp_no,
      schedule_id,
      confirmed_date,
      status
    );

  if (response.error) return res.status(400).json(response);
  res.status(201).json(response);
});

/**
 * @swagger
 * /employee-confirmation:
 *   get:
 *     summary: Get all employee transport confirmations
 *     tags: [Employee Transport Confirmation]
 *     responses:
 *       200: { description: List of confirmations }
 */
router.get("/", async (req, res) => {
  apiCall("Fetching all employee confirmations");
  const response =
    await EmployeeTransportConfirmationServices.fetchEmployeeConfirmations();
  res.json(response);
});

/**
 * @swagger
 * /employee-confirmation/{id}:
 *   get:
 *     summary: Get employee confirmation by ID
 *     tags: [Employee Transport Confirmation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Confirmation found }
 *       404: { description: Confirmation not found }
 */
router.get("/:id", async (req, res) => {
  apiCall("Fetching employee confirmation by ID");
  const response =
    await EmployeeTransportConfirmationServices.fetchEmployeeConfirmation(
      req.params.id
    );
  if (response.error || response.length === 0)
    return res.status(404).json({ error: "Confirmation not found" });
  res.json(response);
});

/**
 * @swagger
 * /employee-confirmation/{id}:
 *   put:
 *     summary: Update employee confirmation
 *     tags: [Employee Transport Confirmation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmed_date: { type: string, format: date, example: "2025-04-13" }
 *               status: { type: string, example: "Accepted" }
 *     responses:
 *       200: { description: Confirmation updated }
 *       400: { description: Update failed }
 */
router.put("/:id", async (req, res) => {
  apiCall("Updating employee confirmation");
  const { confirmed_date, status } = req.body;
  const { id } = req.params;

  const response =
    await EmployeeTransportConfirmationServices.updateEmployeeConfirmation(
      id,
      confirmed_date,
      status
    );

  if (response.error) return res.status(400).json(response);
  res.json(response);
});

/**
 * @swagger
 * /employee-confirmation/{id}:
 *   delete:
 *     summary: Delete employee confirmation by ID
 *     tags: [Employee Transport Confirmation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Confirmation deleted }
 *       404: { description: Confirmation not found }
 */
router.delete("/:id", async (req, res) => {
  apiCall("Deleting employee confirmation");
  const response =
    await EmployeeTransportConfirmationServices.deleteEmployeeConfirmation(
      req.params.id
    );
  if (response.error) return res.status(404).json(response);
  res.json(response);
});

export default router;
