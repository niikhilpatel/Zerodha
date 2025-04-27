import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'; // ✅ (Step 1) Import multer
import otpRoutes from "./routes/otpRoutes.js";
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


let otpStore = {}; // (In-memory OTP store)

// (Step 2) Set up multer to upload files into 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

app.use("/", otpRoutes);

// (Step 3) Use multer middleware in your route
app.post('/save-details', upload.single('bankStatement'), (req, res) => {
  console.log('Received details:', req.body);    // form fields (name, email, etc.)
  console.log('Uploaded file:', req.file);        // file info (bank statement pdf)

  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
