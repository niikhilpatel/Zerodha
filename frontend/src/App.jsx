import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import SignupPage from './pages/Signup';
import DetailsPage from './pages/DetailsPage';
import Footer from './components/Footer';
import MultiPageForm from './components/MultiStepForm/MultiStepForm';
import DashboardLayout from './Dashboard/DashboardLayout';
import Wishlist from './Dashboard/pages/Wishlist';
import Orders from './Dashboard/pages/Orders';
import Portfolio from './Dashboard/pages/Portfolio';
import Account from './Dashboard/pages/Account';

function App() {
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

        {/* Dashboard Layout with Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="account" element={<Account />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
