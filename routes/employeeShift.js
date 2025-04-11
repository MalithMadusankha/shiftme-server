import express from "express";
import { EmployeeShiftService } from "../services/employeeShift.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: EmployeeShift
 *   description: Manage Employee-Shift Assignments
 */

/**
 * @swagger
 * /employee-shift:
 *   post:
 *     summary: Assign a shift to an employee
 *     tags: [EmployeeShift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *               shift_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Assignment created
 */
router.post("/", async (req, res) => {
  const { employee_id, shift_id } = req.body;
  const result = await EmployeeShiftService.assignShiftToEmployee(
    employee_id,
    shift_id
  );
  res.json(result);
});

/**
 * @swagger
 * /employee-shift:
 *   delete:
 *     summary: Remove a shift from an employee
 *     tags: [EmployeeShift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *               shift_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Assignment removed
 */
router.delete("/", async (req, res) => {
  const { employee_id, shift_id } = req.body;
  const result = await EmployeeShiftService.unassignShiftFromEmployee(
    employee_id,
    shift_id
  );
  res.json(result);
});

/**
 * @swagger
 * /employee-shift/employee/{employee_id}:
 *   get:
 *     summary: Get all shifts assigned to an employee
 *     tags: [EmployeeShift]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of shifts
 */
router.get("/employee/:employee_id", async (req, res) => {
  const result = await EmployeeShiftService.getShiftsByEmployee(
    req.params.employee_id
  );
  res.json(result);
});

/**
 * @swagger
 * /employee-shift/shift/{shift_id}:
 *   get:
 *     summary: Get all employees assigned to a shift
 *     tags: [EmployeeShift]
 *     parameters:
 *       - in: path
 *         name: shift_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/shift/:shift_id", async (req, res) => {
  const result = await EmployeeShiftService.getEmployeesByShift(
    req.params.shift_id
  );
  res.json(result);
});

export default router;
