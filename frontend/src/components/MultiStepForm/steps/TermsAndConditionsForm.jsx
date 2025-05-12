import React from 'react';

const TermsAndConditions = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
      <div className="mb-4">
        <input
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
          className="mr-2"
        />
        <span>I accept the Terms and Conditions</span>
      </div>
    </div>
  );
};

export default TermsAndConditions;
