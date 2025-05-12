import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';  // Import your axios instance

const AddToWishlistForm = ({ onAdded }) => {
    const [stockName, setStockName] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [userId, setUserId] = useState('');  // To link the wishlist to a specific user

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to the API to add the stock
            const response = await axiosInstance.post('/wishlist/add', {
                stockName,
                stockSymbol,
                price,
                userId,  // Make sure to associate the wishlist item with a user
            });

            // Pass the new item to the parent component
            onAdded(response.data);

            // Reset the form after adding the item
            setStockName('');
            setStockSymbol('');
            setPrice('');
            setUserId('');
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Stock Name"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                required
                className="border p-2 mb-2 w-full rounded"
            />
            <input
                type="text"
                placeholder="Stock Symbol"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
                required
                className="border p-2 mb-2 w-full rounded"
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border p-2 mb-2 w-full rounded"
            />
            <input
                type="text"
                placeholder="User ID (for associating wishlist)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="border p-2 mb-2 w-full rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add to Wishlist
            </button>
        </form>
    );
};

export default AddToWishlistForm;
