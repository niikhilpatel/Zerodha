import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToWishlistForm from '../../components/StockSearchAndAdd';

const Wishlist = () => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [wishlist, setWishlist] = useState([]); // Ensuring wishlist is initialized as an empty array
    const [filteredWishlist, setFilteredWishlist] = useState([]); // Same for filteredWishlist
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch initial data
    useEffect(() => {
        axios.get('/api/wishlist')
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setWishlist(list);
                setFilteredWishlist(list); // Ensure the filtered list is set to the same
            })
            .catch(err => console.error(err));
    }, []);

    // Handle search input change
    const handleSearch = e => {
        setSearchQuery(e.target.value);
    };

    // Filter the wishlist based on the search query
    useEffect(() => {
        if (!searchQuery) {
            setFilteredWishlist(wishlist); // Reset filtered list if search is empty
        } else {
            setFilteredWishlist(
                wishlist.filter(item =>
                    item.stockName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, wishlist]);

    // Pagination effect
    useEffect(() => {
        axios.get(`/api/wishlist?page=${page}&limit=10`)
            .then(res => {
                setWishlist(res.data.items);
                setPages(res.data.pages);
            });
    }, [page]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

            {/* 1) Add-to-Wishlist Form */}
            <AddToWishlistForm
                onAdded={item => {
                    // Prepend the new item to both state arrays
                    setWishlist(prev => [item, ...prev]);
                    setFilteredWishlist(prev => [item, ...prev]);
                }}
            />

            <div className="flex gap-2 mt-4">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                <span>{page} / {pages}</span>
                <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
            </div>

            {/* 2) Search Bar */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search stocks…"
                className="border p-2 mb-4 w-full rounded"
            />

            {/* 3) List */}
            {filteredWishlist && filteredWishlist.length > 0 ? (
                <ul className="space-y-2">
                    {filteredWishlist.map((stock, idx) => (
                        <li key={idx} className="flex justify-between p-4 border rounded hover:shadow">
                            <div>
                                <h2 className="font-semibold">{stock.stockName}</h2>
                                <p className="text-sm text-gray-600">{stock.stockSymbol}</p>
                            </div>
                            <span className="text-green-600 font-bold">₹{stock.price}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No stocks in your wishlist.</p>
            )}
        </div>
    );
};

export default Wishlist;
