import React from 'react';

const BankDetailsForm = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bank Details</h2>
      <div className="mb-4">
        <label>Bank Name</label>
        <input
          type="text"
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label>Account Number</label>
        <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label>IFSC Code</label>
        <input
          type="text"
          value={formData.ifsc}
          onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default BankDetailsForm;
