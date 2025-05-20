// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import otpRoutes from './routes/authRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import accountRoutes from './routes/account.js';
import razorpayRoutes from './routes/razorpay.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/payment', razorpayRoutes);

// File Upload Route
app.post('/save-details', upload.single('bankStatement'), (req, res) => {
  console.log('Received details:', req.body);
  console.log('Uploaded file:', req.file);
  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});