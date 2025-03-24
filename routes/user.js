import { Router } from "express";
import userServices from "../services/user.js";

const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: The user was created successfully
 *       400:
 *         description: Bad Request if data is incomplete
 */
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const response = await userServices.createUser(name, email);
  res.json(response);
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database
 *     responses:
 *       200:
 *         description: A list of users
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
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 */
router.get("/", async (req, res) => {
  const response = await userServices.fetchUsers();
  res.json(response);
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Remove a user from the database using their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await userServices.deleteUser(id);
  res.json(response);
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user's information
 *     description: Modify the details of an existing user by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
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
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad Request if data is incomplete
 *       404:
 *         description: User not found
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const response = await userServices.editUser(id, name, email);
  res.json(response);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a specific user from the database by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A user object
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
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await userServices.fetchUser(id);
  res.json(response);
});

export default router;
