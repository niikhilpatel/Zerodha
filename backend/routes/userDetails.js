// routes/userDetails.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/user-details', async (req, res) => {
    try {
        const {
            fullName,
            dob,
            fatherName,
            aadhaar,
            pan,
            bankName,
            accountNumber,
            ifsc,
            termsAccepted,
            signature,
        } = req.body;

        // If signature exists and is base64 format, save it as a PNG
        let signatureFilePath = '';
        if (signature && signature.startsWith('data:image/png;base64,')) {
            const base64Data = signature.replace(/^data:image\/png;base64,/, '');
            const filename = `${Date.now()}_signature.png`;
            const uploadPath = path.join(__dirname, '..', 'uploads', filename);
            fs.writeFileSync(uploadPath, base64Data, 'base64');
            signatureFilePath = `/uploads/${filename}`; // store path in DB if needed
        }

        // TODO: Save form data (including signatureFilePath) to DB here

        res.json({ success: true, message: 'User details saved', signaturePath: signatureFilePath });
    } catch (err) {
        console.error('Error saving user details:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
