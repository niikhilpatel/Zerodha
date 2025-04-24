import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import SignupPage from './pages/Signup';
import DetailsPage from './pages/DetailsPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
