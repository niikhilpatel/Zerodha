import {
    User
} from "../models/userModel.js"; // Assuming you're using a User model
import transporter from "../config/transporter.js";

export const sendOtp = async (req, res) => {
    const {
        email
    } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP

    try {
        // Store OTP in the database for the user
        let user = await User.findOne({
            email
        });

        if (!user) {
            user = new User({
                email,
                otp,
                otpVerified: false
            });
            await user.save();
        } else {
            user.otp = otp;
            user.otpVerified = false;
            await user.save();
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        });

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};

export const verifyOtp = async (req, res) => {
    const {
        email,
        otp
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user || user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Mark OTP as verified
        user.otpVerified = true;
        await user.save();

        // You can create a session or return a JWT token here for user authentication
        const token = createJwtToken(user); // Create a JWT (explained below)
        res.status(200).json({
            success: true,
            message: "OTP Verified",
            token
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify OTP"
        });
    }
};

// JWT Token creation function
const createJwtToken = (user) => {
    const jwt = require("jsonwebtoken");
    return jwt.sign({
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "1h"
        } // You can adjust token expiration time
    );
};