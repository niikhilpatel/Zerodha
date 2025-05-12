import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ALPHA_VANTAGE_KEY = 'YOUR_KEY_HERE';

const StockSearchAndAdd = ({ onAdded }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(null);

    // Fetch symbol suggestions when query changes
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        const fetchSymbols = async () => {
            try {
                const res = await axios.get(
                    `https://www.alphavantage.co/query`,
                    {
                        params: {
                            function: 'SYMBOL_SEARCH',
                            keywords: query,
                            apikey: ALPHA_VANTAGE_KEY
                        }
                    }
                );
                // Alpha Vantage returns { bestMatches: [ { '1. symbol': 'AAPL', '2. name': 'Apple Inc.', ... }, … ] }
                const matches = res.data.bestMatches || [];
                setSuggestions(matches.map(m => ({
                    symbol: m['1. symbol'],
                    name: m['2. name']
                })));
            } catch (err) {
                console.error('Symbol search error', err);
                setSuggestions([]);
            }
        };
        fetchSymbols();
    }, [query]);

    const handleSelect = (symbol, name) => {
        setSelected({ symbol, name });
        setQuery(name);
        setSuggestions([]);
    };

    const handleAdd = () => {
        if (!selected) return;
        // You might fetch a real-time price here. For now, leave price blank.
        onAdded({
            stockName: selected.name,
            stockSymbol: selected.symbol,
            price: '' // or fetch from another endpoint
        });
        setSelected(null);
        setQuery('');
    };

    return (
        <div className="relative mb-4">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search stock name or symbol…"
                className="border p-2 w-full rounded"
            />
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border w-full max-h-60 overflow-y-auto z-10">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            onClick={() => handleSelect(s.symbol, s.name)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <span className="font-semibold">{s.symbol}</span> — {s.name}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={handleAdd}
                disabled={!selected}
                className={`mt-2 px-4 py-2 rounded text-white ${selected ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                Add to Wishlist
            </button>
        </div>
    );
};

export default StockSearchAndAdd;
