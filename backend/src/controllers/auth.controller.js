import User from "../models/user.schema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields are Required",
                data: null,
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already found, Plase Login",
                data: null,
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPass,
        });

        res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};
