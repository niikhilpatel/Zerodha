import React, { useEffect } from 'react';
import axios from 'axios';

const Account = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const loadRazorpay = async () => {
        const res = await axios.post('/api/payment/create-order', { amount: 500 }); // ₹500
        const order = res.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // replace with your Razorpay key ID
            amount: order.amount,
            currency: order.currency,
            name: 'Your App Name',
            description: 'Add Funds',
            order_id: order.id,
            handler: async (response) => {
                await axios.post('/api/payment/verify', response);
                alert('Payment successful!');
            },
            theme: {
                color: '#3399cc'
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Account Details</h2>
            <p>Edit your personal and banking information here.</p>
            <button
                onClick={loadRazorpay}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add Funds
            </button>
        </div>
    );
};

export default Account;
