// routes/payment.js
const express = require('express');
const router = express.Router();
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

// 1. Create Razorpay Order
router.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // convert to paise
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating order' });
    }
});

// 2. Verify Payment Signature
router.post('/verify', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        return res.json({ success: true, message: 'Payment verified' });
    } else {
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});

module.exports = router;
    