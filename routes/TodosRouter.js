import { Router } from "express";
import {
  getTodos,
  createTodos,
  deleteTodos,
} from "../controllers/TodoController.js";
import { verifyUser } from "../middleware/AuthMiddleware.js";

const router = Router();

router.get("/todos", verifyUser, getTodos);
router.post("/todos", verifyUser, createTodos);
router.delete("/todos/:id", verifyUser, deleteTodos);

export default router;
