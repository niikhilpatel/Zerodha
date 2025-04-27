import React, { useState } from 'react';
import PersonalInfoForm from './steps/PersonalInfoForm';
import IdentityForm from './steps/IdentityForm';
import SignatureForm from './steps/SignatureForm';
import BankDetailsForm from './steps/BankDetailsForm';
import TermsAndConditionsForm from './steps/TermsAndConditionsForm';
import axios from 'axios';

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        fatherName: '',
        aadharCard: '',
        panCard: '',
        signature: '',
        bankDetails: {
            accountNo: '',
            ifscCode: '',
            bankName: '',
            statementFile: null,
        },
        acceptedTerms: false,
    });

    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handlePrev = () => setCurrentStep((prev) => prev - 1);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBankChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            bankDetails: {
                ...prev.bankDetails,
                [field]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (key === 'bankDetails') {
                    for (const bankKey in formData.bankDetails) {
                        formDataToSend.append(bankKey, formData.bankDetails[bankKey]);
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            await axios.post('http://localhost:5000/save-details', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Details submitted successfully!');
        } catch (err) {
            console.error(err);
            alert('Error submitting details.');
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm formData={formData} handleChange={handleChange} handleNext={handleNext} />;
            case 2:
                return <IdentityForm formData={formData} handleChange={handleChange} handleNext={handleNext} handlePrev={handlePrev} />;
            case 3:
                return <SignatureForm formData={formData} handleChange={handleChange} handleNext={handleNext} handlePrev={handlePrev} />;
            case 4:
                return <BankDetailsForm formData={formData} handleBankChange={handleBankChange} handleNext={handleNext} handlePrev={handlePrev} />;
            case 5:
                return <TermsAndConditionsForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handlePrev={handlePrev} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-5 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Multi Step Form</h1>
            {renderStep()}
        </div>
    );
};

export default MultiStepForm;
