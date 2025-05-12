// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const linkClass = (path) =>
        `block px-4 py-2 rounded hover:bg-gray-200 ${location.pathname === path ? 'bg-gray-300 font-bold' : ''}`;

    return (
        <div
            className={`fixed z-30 top-0 left-0 h-full w-64 bg-white border-r transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:static md:h-auto`}
        >
            <div className="p-4 border-b font-bold text-lg">Zerodha Dashboard</div>
            <nav className="p-4 flex flex-col gap-2">
                <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
                <Link to="/dashboard/wishlist" className={linkClass('/dashboard/wishlist')}>Wishlist</Link>
                <Link to="/dashboard/orders" className={linkClass('/dashboard/orders')}>Orders</Link>
                <Link to="/dashboard/portfolio" className={linkClass('/dashboard/portfolio')}>Portfolio</Link>
                <Link to="/dashboard/account" className={linkClass('/dashboard/account')}>Account</Link>
            </nav>
        </div>
    );
};

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center justify-between p-4 border-b shadow">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                    <span className="font-semibold">Dashboard</span>
                </header>

                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
