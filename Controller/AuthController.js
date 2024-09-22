import jwt from "jsonwebtoken";
import { AdminCollection, UserCollection } from "../Database/DB.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
    const { name, username, email, password, age, nationality, role } =
        req.body;

    try {
        const existingUser =
            (await UserCollection.findOne({ email })) ||
            (await AdminCollection.findOne({ email }));
        if (existingUser) {
            return res.status(404).json({ message: "User Already Exists." });
        }
        let user;
        if (role === "admin") {
            user = new AdminCollection({
                name,
                username,
                email,
                password,
                age,
                nationality,
            });
        } else {
            user = new UserCollection({
                name,
                username,
                email,
                password,
                age,
                nationality,
            });
        }
        await user.save();
        res.status(200).json({
            message: "User registered successfully",
        });
    } catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await UserCollection.findOne({ email });
        let role = "user";
        if (!user) {
            user = AdminCollection.findOne({ email });
            role = "admin";
        }
        if (!user) {
            return res.status(404).json({
                message: "User Not found",
            });
        }

        // todo: Compare the password with the db password

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                role,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token, role });
    } catch (e) {}
};
