import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access Denied",
        });
    }
    next();
};
