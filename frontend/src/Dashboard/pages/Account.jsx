import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Account = () => {
    const [accountData, setAccountData] = useState({
        fund: 0,
        clientId: '',
    });

    // Load Razorpay script on mount
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        // Fetch account data from backend
        const fetchAccountData = async () => {
            try {
                const res = await axios.get('/api/account');
                setAccountData(res.data);
            } catch (err) {
                console.error('Failed to fetch account data:', err);
            }
        };

        fetchAccountData();
    }, []);

    const loadRazorpay = async () => {
        try {
            const res = await axios.post('/api/payment/create-order', { amount: 500 });
            const order = res.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Zerodha Clone',
                description: 'Add Funds',
                order_id: order.id,
                handler: async (response) => {
                    await axios.post('/api/payment/verify', response);
                    alert('Payment successful!');
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error loading Razorpay:', error);
        }
    };

    return (
        <div className="p-3">
            <h2 className="text-2xl font-semibold mb-6">Account</h2>
            <ul className="space-y-4">
                {/* 1. Fund */}
                <li className="flex justify-between items-center p-1">
                    <div>
                        <p className="font-medium">Funds</p>
                        <p className="text-lg text-green-600 font-bold">₹{accountData.fund}</p>
                    </div>
                    <button
                        onClick={loadRazorpay}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Funds
                    </button>
                </li>

                {/* 2. Client ID */}
                <li className="flex justify-between items-center p-2">
                    <span className="font-medium">Client ID</span>
                    <span className="text-gray-700">{accountData.clientId}</span>
                </li>

                {/* 3. Fund (again) */}
                <li className="flex justify-between items-center p-2">
                    <span className="font-medium">Fund</span>
                    <span className="text-gray-700">Details...</span>
                </li>

                {/* 4. Report */}
                <li className="flex justify-between items-center p-2">
                    <span className="font-medium">Report</span>
                    <span className="text-gray-700">View Reports</span>
                </li>

                {/* 5. Transactions */}
                <li className="flex justify-between items-center p-2">
                    <span className="font-medium">Transactions</span>
                    <span className="text-gray-700">History</span>
                </li>

                {/* 6. Help */}
                <li className="flex justify-between items-center p-2">
                    <span className="font-medium">Help</span>
                    <span className="text-gray-700">Get Support</span>
                </li>

                {/* 7. Refer a Friend */}
                <li className="flex justify-between items-center p-2">
                    <span className="font-medium">Refer a Friend</span>
                    <span className="text-blue-500 hover:underline cursor-pointer">Invite Now</span>
                </li>
            </ul>
        </div>
    );
};

export default Account;
