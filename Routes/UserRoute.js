import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/admin", (req, res) => {
    res.send();
});

export { userRoutes };
