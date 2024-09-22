import { Router } from "express";
import { login, register } from "../Controller/AuthController.js";

const authRoutes = Router();

authRoutes.post("/register", (req, res) => {
    register(req, res);
});

authRoutes.post("/login", (req, res) => {
    login(req, res);
});

export { authRoutes };
