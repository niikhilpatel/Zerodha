// In your protected routes (Dashboard or others)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            // You can verify the token on the backend if needed
            setIsAuthenticated(true);
        }
    }, [navigate]);

    if (!isAuthenticated) return null;  // Optionally, show a loading spinner

    return children;
};

export default ProtectedRoute;
