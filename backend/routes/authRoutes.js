import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

let otpStore = {}; // Temporary store (use Redis/DB in production)

router.post('/send-otp', async (req, res) => {
    const {
        email
    } = req.body;
    if (!email) return res.status(400).json({
        message: "Email is required"
    });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: `"Signup OTP" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP for Signup",
            text: `Your OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            message: 'OTP sent successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to send OTP'
        });
    }
});

router.post('/verify-otp', (req, res) => {
    const {
        email,
        otp
    } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }

    if (otpStore[email] && otpStore[email] == otp) {
        delete otpStore[email];
        return res.status(200).json({
            message: "OTP verified successfully"
        });
    } else {
        return res.status(400).json({
            message: "Invalid OTP"
        });
    }
});

export default router;