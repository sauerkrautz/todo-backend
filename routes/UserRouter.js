import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/UserController.js";

import { verifyUser, adminOnly } from "../middleware/AuthMiddleware.js";

const router = Router();

router.get("/users", verifyUser, getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", verifyUser, createUser);
router.patch("/users/:id", verifyUser, updateUserProfile);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;
