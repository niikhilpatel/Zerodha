import React from 'react';

const IdentityForm = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col gap-5 p-5 items-center">
            <h2 className="text-2xl font-bold">Identity Details</h2>

            <input
                type="text"
                name="aadharNumber"
                placeholder="Aadhar Number"
                value={formData.aadharNumber || ''}
                onChange={handleChange}
                className="border p-3 w-80 rounded"
            />
            <input
                type="text"
                name="panNumber"
                placeholder="PAN Number"
                value={formData.panNumber || ''}
                onChange={handleChange}
                className="border p-3 w-80 rounded"
            />

            <div className="flex gap-4">
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

export default IdentityForm;
