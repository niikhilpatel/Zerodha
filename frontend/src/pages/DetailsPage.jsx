import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        name: '',
        pan: '',
        address: '',
        email: state?.email || '',
    });

    useEffect(() => {
        if (!state?.email) {
            // If no email (user directly accessed URL), redirect to home
            navigate('/');
        }
    }, [state, navigate]);

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const submitDetails = async () => {
        try {
            await axios.post('http://localhost:5000/save-details', details);
            alert('Details submitted successfully!');
        } catch (err) {
            console.error(err);
            alert('Error submitting details.');
        }
    };

    return (
        <div className="p-5 flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold">Enter Your Details</h2>
            <p className="text-xl mt-4">
                Your email <span className="font-semibold">{details.email}</span> has been verified.
            </p>
            <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                value={details.name}
                className="border p-2 w-80 rounded"
            />
            <input
                name="pan"
                placeholder="PAN Number"
                onChange={handleChange}
                value={details.pan}
                className="border p-2 w-80 rounded"
            />
            <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={details.address}
                className="border p-2 w-80 rounded"
            />
            <button
                onClick={submitDetails}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-4"
            >
                Submit
            </button>
        </div>
    );
};

export default DetailsPage;
