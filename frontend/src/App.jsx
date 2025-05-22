import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignupPage from './pages/Signup';
import DetailsPage from './pages/DetailsPage';
import MultiPageForm from './components/MultiStepForm/MultiStepForm';
import LoginPage from './pages/LoginPage';  // Import the LoginPage component
import DashboardLayout from './Dashboard/DashboardLayout';
import Wishlist from './Dashboard/pages/Wishlist';
import Orders from './Dashboard/pages/Orders';
import Portfolio from './Dashboard/pages/Portfolio';
import Account from './Dashboard/pages/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (for demo purposes, checking localStorage)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Footer />
          </>
        } />

        <Route path="/signup" element={
          <>
            <Navbar />
            <SignupPage />
            <Footer />
          </>
        } />

        <Route path="/details" element={
          <>
            <Navbar />
            <DetailsPage />
            <Footer />
          </>
        } />

        <Route path="/userdetails" element={
          <>
            <Navbar />
            <MultiPageForm />
            <Footer />
          </>
        } />

        {/* Login Page */}
        <Route path="/login" element={
          <>
            <Navbar />
            <LoginPage />  {/* Add the Login page route */}
            <Footer />
          </>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="wishlist" element={<><Navbar /><Wishlist /><Footer /></>} />
          <Route path="orders" element={<><Navbar /><Orders /><Footer /></>} />
          <Route path="portfolio" element={<><Navbar /><Portfolio /><Footer /></>} />
          <Route path="account" element={<><Navbar /><Account /><Footer /></>} />
        </Route>
       


      </Routes>
    </Router>
  );
}

export default App;
