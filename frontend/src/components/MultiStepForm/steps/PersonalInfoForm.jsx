import React from 'react';

const PersonalInfoForm = ({ formData, setFormData, nextStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col gap-5 p-5 items-center">
            <h2 className="text-2xl font-bold">Personal Information</h2>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name || ''}
                onChange={handleChange}
                className="border p-3 w-80 rounded"
            />
            <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob || ''}
                onChange={handleChange}
                className="border p-3 w-80 rounded"
            />
            <input
                type="text"
                name="fatherName"
                placeholder="Father's Name"
                value={formData.fatherName || ''}
                onChange={handleChange}
                className="border p-3 w-80 rounded"
            />

            <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded"
            >
                Next
            </button>
        </div>
    );
};

export default PersonalInfoForm;
