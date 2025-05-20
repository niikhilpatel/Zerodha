// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null); // Store the JWT token

    const handleSendOtp = async () => {
        setIsLoading(true);
        try {
            await axios.post('/api/send-otp', { email });
            setIsOtpSent(true);
            alert('OTP sent to your email!');
        } catch (error) {
            console.error('Failed to send OTP:', error);
            alert('Error sending OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/verify-otp', { email, otp });
            const { token } = response.data;
            setToken(token);  // Store the JWT token on successful login
            localStorage.setItem('token', token);  // Save token in localStorage for future requests
            alert('OTP verified! Redirecting to Dashboard...');
            window.location.href = '/dashboard'; // Redirect to dashboard
        } catch (error) {
            console.error('Invalid OTP:', error);
            alert('Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-white mx-5 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Enter your email"
                />
            </div>

            {isOtpSent ? (
                <>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block mb-2">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter OTP"
                        />
                    </div>

                    <button
                        onClick={handleVerifyOtp}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
                    </button>
                </>
            ) : (
                <button
                    onClick={handleSendOtp}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            )}
        </div>
    );
};

export default LoginPage;
