import React, { useState, useRef } from 'react';

const SignatureForm = ({ formData, setFormData, nextStep, prevStep }) => {
    const [preview, setPreview] = useState(formData.signature || null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, signature: reader.result });
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openCamera = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col gap-5 p-5 items-center">
            <h2 className="text-2xl font-bold">Upload Your Signature</h2>

            {preview ? (
                <img src={preview} alt="Signature Preview" className="w-64 h-32 object-contain border" />
            ) : (
                <div className="w-64 h-32 border flex items-center justify-center text-gray-500">
                    No signature uploaded
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="flex gap-4">
                <button
                    onClick={openCamera}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded"
                >
                    Open Camera / Upload
                </button>
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

export default SignatureForm;
