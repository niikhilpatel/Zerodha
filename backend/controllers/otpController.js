import transporter from "../config/transporter.js";

const otpStore = {}; // Simple in-memory storage (for now)

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Zerodha NRI OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; font-size: 16px;">
                    <p>Hello,</p>
                    <p>Your Zerodha NRI verification OTP code is: <strong>${otp}</strong></p>
                    <p>Please do not share this code with anyone.</p>
                    <br/>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXsvijSgm5SXQ7AN5oZLut1ptneCFDP0V6Q&s" alt="Zerodha Logo" style="width: 200px; height: auto;" />
                </div>
            `,
            // text: `Your Zerodha NRI verification OTP code is: ${otp} <br/> Please do not share this code with anyone.`,
        });

        otpStore[email] = otp;
        console.log(`OTP for ${email} is ${otp}`); // (Only for debugging)

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};

export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    
    if (otpStore[email] && otpStore[email] == otp) {
        delete otpStore[email]; // OTP verified, remove it
        return res.status(200).json({ success: true, message: "OTP Verified" });
    } else {
        return res.status(400).json({ success: false, message: "Invalid or Expired OTP" });
    }
};
