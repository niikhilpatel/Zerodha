import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Portfolio from './pages/Portfolio';
import Account from './pages/Account';

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="wishlist" />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="orders" element={<Orders />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="account" element={<Account />} />
            </Route>
        </Routes>
    );
};

export default DashboardRoutes;
