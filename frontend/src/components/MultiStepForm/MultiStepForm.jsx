import React, { useState } from 'react';
import PersonalDetailsForm from './steps/PersonalInfoForm';
import IDDetailsForm from './steps/IdentityForm';
import SignatureForm from './steps/SignatureForm';
import BankDetailsForm from './steps/BankDetailsForm';
import TermsAndConditions from './steps/TermsAndConditionsForm';

const MultiStepForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        fatherName: '',
        aadhaar: '',
        pan: '',
        signature: '',
        bankName: '',
        accountNumber: '',
        ifsc: '',
        termsAccepted: false,
    });

    const steps = [
        <PersonalDetailsForm formData={formData} setFormData={setFormData} />,
        <IDDetailsForm formData={formData} setFormData={setFormData} />,
        <SignatureForm formData={formData} setFormData={setFormData} />,
        <BankDetailsForm formData={formData} setFormData={setFormData} />,
        <TermsAndConditions formData={formData} setFormData={setFormData} />,
    ];

    const nextStep = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = () => {
        console.log('Form Submitted:', formData);
        alert('Form submitted successfully!');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-white mx-5 rounded-md shadow-md">
            {steps[step]}

            <div className="flex justify-between mt-6">
                {step > 0 && (
                    <button
                        onClick={prevStep}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back
                    </button>
                )}

                {step < steps.length - 1 ? (
                    <button
                        onClick={nextStep}
                        className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
