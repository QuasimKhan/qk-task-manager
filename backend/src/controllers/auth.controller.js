import User from "../models/user.schema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        res.status(201).json({
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

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            success: false,
            message: "Please enter email and password",
            data: null,
        });
    }
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, please register first",
                data: null,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
                data: null,
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
                success: true,
                message: "Login Successfully",
                token,
                data: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                },
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};
