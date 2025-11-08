import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "No token provided" });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired, please login again",
                });
            }
            return res
                .status(401)
                .json({ success: false, message: "Invalid token" });
        }

        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User no longer exists" });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
