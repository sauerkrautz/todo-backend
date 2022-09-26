import { Router } from "express";
import { login, checkLogin, logout } from "../controllers/Auth.js";

const router = Router();

router.post("/login", login);
router.get("/me", checkLogin);
router.delete("/logout", logout);

export default router;
