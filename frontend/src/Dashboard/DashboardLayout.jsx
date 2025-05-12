// src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, BarChart2, User } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const linkClass = (path) =>
        `block px-4 py-2 rounded hover:bg-gray-200 ${location.pathname === path ? 'bg-gray-300 font-bold' : ''}`;

    return (
        <div className="hidden md:block w-64 bg-white border-r h-screen fixed">
            <div className="p-4 border-b font-bold text-lg">Zerodha Dashboard</div>
            <nav className="p-4 flex flex-col gap-2">
                <Link to="/dashboard/wishlist" className={linkClass('/dashboard/wishlist')}>Wishlist</Link>
                <Link to="/dashboard/orders" className={linkClass('/dashboard/orders')}>Orders</Link>
                <Link to="/dashboard/portfolio" className={linkClass('/dashboard/portfolio')}>Portfolio</Link>
                <Link to="/dashboard/account" className={linkClass('/dashboard/account')}>Account</Link>
            </nav>
        </div>
    );
};

const BottomNav = () => {
    const location = useLocation();

    const linkClass = (path) =>
        `flex flex-col items-center justify-center text-xs ${location.pathname === path ? 'text-blue-600' : 'text-gray-500'}`;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-20">
            <Link to="/dashboard/wishlist" className={linkClass('/dashboard/wishlist')}>
                <Heart size={25} />
                <span className='text-lg'>Wishlist</span>
            </Link>
            <Link to="/dashboard/orders" className={linkClass('/dashboard/orders')}>
                <ShoppingCart size={25} />
                <span className='text-lg'>Orders</span>
            </Link>
            <Link to="/dashboard/portfolio" className={linkClass('/dashboard/portfolio')}>
                <BarChart2 size={25} />
                <span className='text-lg'>Portfolio</span>
            </Link>
            <Link to="/dashboard/account" className={linkClass('/dashboard/account')}>
                <User size={25} />
                <span className='text-lg'>Account</span>
            </Link>
        </div>
    );
};

const getActiveTabLabel = (pathname) => {
    if (pathname.includes('/wishlist')) return 'Wishlist';
    if (pathname.includes('/orders')) return 'Orders';
    if (pathname.includes('/portfolio')) return 'Portfolio';
    if (pathname.includes('/account')) return 'Account';
    return 'Dashboard';
};

const DashboardLayout = () => {
    const location = useLocation();
    const activeTab = getActiveTabLabel(location.pathname);

    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            {/* Sidebar for desktop */}
            <Sidebar />

            <div className="flex-1 flex flex-col md:ml-64">
                {/* Mobile Top Bar */}
                <header className="md:hidden flex items-center justify-left p-4 border-b shadow text-lg font-semibold">
                    {activeTab}
                </header>

                {/* Main Content */}
                <main className="p-4 pb-20 md:pb-4">
                    <Outlet />
                </main>

                {/* Bottom Tab Nav for mobile */}
                <BottomNav />
            </div>
        </div>
    );
};

export default DashboardLayout;
