import { Router } from "express";
import UserServices from "../services/user.js";
import { apiCall } from "../helper/consoleLog.js";
const router = Router();

// Let me know if you'd like to generate the Swagger model definition or integrate role-based access control too.

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Add a new user to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 example: firebase123abc
 *               role:
 *                 type: string
 *                 enum: ['MD', 'ShiftMeAdmin', 'CompanyAdmin', 'Employee', 'Driver']
 *                 example: CompanyAdmin
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: +1234567890
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
 *         description: The user was created successfully
 *       400:
 *         description: Bad Request if data is incomplete or invalid
 */
router.post("/", async (req, res) => {
  apiCall("Creating a new user");
  const {
    uid,
    role,
    name,
    email,
    phone,
    address,
    location_latitude,
    location_longitude,
  } = req.body;

  // Validate role
  const validRoles = [
    "MD",
    "ShiftMeAdmin",
    "CompanyAdmin",
    "Employee",
    "Driver",
  ];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      error:
        "Invalid role. Must be one of: MD, ShiftMeAdmin, CompanyAdmin, Employee, Driver",
    });
  }

  const response = await UserServices.createUser(
    uid,
    role,
    name,
    email,
    phone,
    address,
    location_latitude,
    location_longitude
  );

  if (response.error) {
    return res.status(400).json(response);
  }

  res.status(201).json(response);
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
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
 *                   uid:
 *                     type: string
 *                     example: firebase123abc
 *                   role:
 *                     type: string
 *                     example: CompanyAdmin
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   phone:
 *                     type: string
 *                     example: +1234567890
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
  apiCall("Fetching all users");
  const response = await UserServices.fetchUsers();
  res.json(response);
});

/**
 * @swagger
 * /user/role/{role}:
 *   get:
 *     summary: Get users by role
 *     tags: [User]
 *     description: Retrieve a list of users with a specific role
 *     parameters:
 *       - name: role
 *         in: path
 *         required: true
 *         description: The role to filter users by
 *         schema:
 *           type: string
 *           enum: ['MD', 'ShiftMeAdmin', 'CompanyAdmin', 'Employee', 'Driver']
 *           example: CompanyAdmin
 *     responses:
 *       200:
 *         description: A list of users with the specified role
 *       400:
 *         description: Invalid role specified
 */
router.get("/role/:role", async (req, res) => {
  apiCall("Fetching users by role");
  const { role } = req.params;

  // Validate role
  const validRoles = [
    "MD",
    "ShiftMeAdmin",
    "CompanyAdmin",
    "Employee",
    "Driver",
  ];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      error:
        "Invalid role. Must be one of: MD, ShiftMeAdmin, CompanyAdmin, Employee, Driver",
    });
  }

  const response = await UserServices.fetchUsersByRole(role);
  res.json(response);
});

/**
 * @swagger
 * /user/{uid}:
 *   get:
 *     summary: Get a user by UID
 *     tags: [User]
 *     description: Retrieve a specific user from the database by their Firebase UID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         description: The Firebase UID of the user to fetch
 *         schema:
 *           type: string
 *           example: firebase123abc
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.get("/:uid", async (req, res) => {
  apiCall("Fetching a user by UID");
  const { uid } = req.params;
  const response = await UserServices.fetchUser(uid);

  if (!response || response.error) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(response);
});

/**
 * @swagger
 * /user/{uid}:
 *   put:
 *     summary: Update a user's information
 *     tags: [User]
 *     description: Modify the details of an existing user by their Firebase UID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         description: The Firebase UID of the user to update
 *         schema:
 *           type: string
 *           example: firebase123abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: ['MD', 'ShiftMeAdmin', 'CompanyAdmin', 'Employee', 'Driver']
 *                 example: Employee
 *               name:
 *                 type: string
 *                 example: John Smith
 *               email:
 *                 type: string
 *                 example: john.smith@example.com
 *               phone:
 *                 type: string
 *                 example: +9876543210
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
 *         description: User updated successfully
 *       400:
 *         description: Bad Request if data is invalid
 *       404:
 *         description: User not found
 */
router.put("/:uid", async (req, res) => {
  apiCall("Updating a user");
  const { uid } = req.params;
  const {
    role,
    name,
    email,
    phone,
    address,
    location_latitude,
    location_longitude,
  } = req.body;

  // Validate role if provided
  if (role) {
    const validRoles = [
      "MD",
      "ShiftMeAdmin",
      "CompanyAdmin",
      "Employee",
      "Driver",
    ];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error:
          "Invalid role. Must be one of: MD, ShiftMeAdmin, CompanyAdmin, Employee, Driver",
      });
    }
  }

  const response = await UserServices.updateUser(
    uid,
    role,
    name,
    email,
    phone,
    address,
    location_latitude,
    location_longitude
  );

  if (response.error) {
    if (response.error.includes("not found")) {
      return res.status(404).json(response);
    }
    return res.status(400).json(response);
  }

  res.json(response);
});

/**
 * @swagger
 * /user/{uid}:
 *   delete:
 *     summary: Delete a user by UID
 *     tags: [User]
 *     description: Remove a user from the database using their Firebase UID
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         description: The Firebase UID of the user to delete
 *         schema:
 *           type: string
 *           example: firebase123abc
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:uid", async (req, res) => {
  apiCall("Deleting a user");
  const { uid } = req.params;
  const response = await UserServices.deleteUser(uid);

  if (response.error) {
    return res.status(404).json(response);
  }

  res.json(response);
});

export default router;
