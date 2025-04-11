import express from "express";
import ShiftServices from "../services/shift.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shift
 *   description: Shift Management
 */

/**
 * @swagger
 * /shift:
 *   post:
 *     summary: Create a new shift
 *     tags: [Shift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               branch_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Shift created successfully
 */
router.post("/", async (req, res) => {
  const { name, branch_id } = req.body;
  const result = await ShiftServices.createShift(name, branch_id);
  res.json(result);
});

/**
 * @swagger
 * /shift:
 *   get:
 *     summary: Get all shifts
 *     tags: [Shift]
 *     responses:
 *       200:
 *         description: List of shifts
 */
router.get("/", async (req, res) => {
  const result = await ShiftServices.fetchShifts();
  res.json(result);
});

/**
 * @swagger
 * /shift/branch/{branch_id}:
 *   get:
 *     summary: Get shifts by branch ID
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: branch_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of shifts in a branch
 */
router.get("/branch/:branch_id", async (req, res) => {
  const result = await ShiftServices.fetchShiftsByBranch(req.params.branch_id);
  res.json(result);
});

/**
 * @swagger
 * /shift/{id}:
 *   get:
 *     summary: Get a shift by ID
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shift data
 */
router.get("/:id", async (req, res) => {
  const result = await ShiftServices.fetchShift(req.params.id);
  res.json(result);
});

/**
 * @swagger
 * /shift/{id}:
 *   put:
 *     summary: Update a shift
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               branch_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Shift updated successfully
 */
router.put("/:id", async (req, res) => {
  const { name, branch_id } = req.body;
  const result = await ShiftServices.editShift(req.params.id, name, branch_id);
  res.json(result);
});

/**
 * @swagger
 * /shift/{id}:
 *   delete:
 *     summary: Delete a shift
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shift deleted successfully
 */
router.delete("/:id", async (req, res) => {
  const result = await ShiftServices.deleteShift(req.params.id);
  res.json(result);
});

export default router;
