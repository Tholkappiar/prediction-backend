import express from "express";
import dotenv from "dotenv";
import { adminRoutes } from "./Routes/AdminRoute.js";
import { userRoutes } from "./Routes/UserRoute.js";
import { authRoutes } from "./Routes/AuthRoute.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
