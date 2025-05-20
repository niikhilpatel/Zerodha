import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/api/orders');
                const orders = res.data;

                setPendingOrders(orders.filter(order => order.status === 'pending'));
                setCompletedOrders(orders.filter(order => order.status === 'completed'));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-3 max-w-4xl mx-auto">
            {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2> */}

            {/* Tab Navigation */}
            <div className="flex gap-3 mb-4">
                <button
                    className={`px-4 py-2 rounded-md ${
                        activeTab === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Orders
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${
                        activeTab === 'completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed Orders
                </button>
            </div>

            {/* Order List */}
            <div className="bg-white shadow rounded-lg p-4 space-y-3">
                {activeTab === 'pending' ? (
                    pendingOrders.length === 0 ? (
                        <p className="text-gray-500">No pending orders.</p>
                    ) : (
                        pendingOrders.map((order, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b border-gray-100 py-2"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{order.symbol}</p>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {order.quantity} | Price: ₹{order.price}
                                    </p>
                                </div>
                                <span className="text-sm text-yellow-600 font-semibold">
                                    {order.status}
                                </span>
                            </div>
                        ))
                    )
                ) : completedOrders.length === 0 ? (
                    <p className="text-gray-500">No completed orders.</p>
                ) : (
                    completedOrders.map((order, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b border-gray-100 py-2"
                        >
                            <div>
                                <p className="font-medium text-gray-800">{order.symbol}</p>
                                <p className="text-sm text-gray-500">
                                    Quantity: {order.quantity} | Price: ₹{order.price}
                                </p>
                            </div>
                            <span className="text-sm text-green-600 font-semibold">
                                {order.status}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
