import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let otpStore = {}; // Store OTPs in-memory

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password', // Use Gmail App Password
  },
});

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = otp;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).send({ success: false, error: err.message });
    res.send({ success: true, message: 'OTP sent!' });
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false, message: 'Invalid OTP' });
  }
});

app.post('/save-details', (req, res) => {
  console.log('Received details:', req.body);
  // Save to DB here (MongoDB/PostgreSQL)
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
