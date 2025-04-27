import React, { useState, useRef } from 'react';

const BankDetailsForm = ({ formData, setFormData, nextStep, prevStep }) => {
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, bankStatement: file });
        }
    };

    return (
        <div className="flex flex-col gap-5 p-5 items-center">
            <h2 className="text-2xl font-bold">Enter Your Bank Details</h2>

            <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                className="border p-2 w-80 rounded"
            />

            <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="IFSC Code"
                className="border p-2 w-80 rounded"
            />

            <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Bank Name"
                className="border p-2 w-80 rounded"
            />

            <div className="flex flex-col items-center gap-2 mt-4">
                <label className="font-semibold">Upload Bank Statement (optional)</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="border p-2 w-80 rounded"
                />
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={prevStep}
                    className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded"
                >
                    Back
                </button>
                <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BankDetailsForm;
