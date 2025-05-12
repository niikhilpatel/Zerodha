import React from 'react';

const PersonalDetailsForm = ({ formData, setFormData }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Personal Details</h2>
            <div className="mb-4">
                <label>Full Name</label>
                <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label>Date of Birth</label>
                <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full border p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label>Father Name</label>
                <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full border p-2 rounded"
                />
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
