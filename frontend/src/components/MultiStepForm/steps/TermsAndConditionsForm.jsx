import React, { useState } from 'react';

const TermsAndConditions = ({ formData, setFormData, prevStep, handleSubmit }) => {
    const [accepted, setAccepted] = useState(false);

    const toggleAcceptance = () => {
        setAccepted(!accepted);
    };

    return (
        <div className="flex flex-col gap-5 p-5 items-center">
            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>

            <div className="border p-4 w-80 rounded h-60 overflow-y-scroll text-sm">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    {/* You can replace this dummy text with real terms */}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={accepted}
                    onChange={toggleAcceptance}
                    className="w-5 h-5"
                />
                <label>I accept the Terms & Conditions</label>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={prevStep}
                    className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!accepted}
                    className={`px-6 py-2 rounded text-white ${accepted ? 'bg-green-600 hover:bg-green-500' : 'bg-green-300 cursor-not-allowed'
                        }`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TermsAndConditions;
