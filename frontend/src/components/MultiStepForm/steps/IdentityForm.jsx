import React from 'react';

const IDDetailsForm = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">ID Details</h2>
      <div className="mb-4">
        <label>Aadhaar Number</label>
        <input
          type="text"
          value={formData.aadhaar}
          onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label>PAN Number</label>
        <input
          type="text"
          value={formData.pan}
          onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default IDDetailsForm;
