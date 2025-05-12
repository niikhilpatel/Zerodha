import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Account from "../assets/account_open.svg";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifyStatus, setVerifyStatus] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const sendOtp = async () => {
        try {
            const res = await axios.post('http://localhost:5000/send-otp', { email });
            if (res.data.success) {
                setOtpSent(true);
                alert("OTP sent to your email.");
            }
        } catch (err) {
            alert("Failed to send OTP. Please check the email.");
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await axios.post('http://localhost:5000/verify-otp', { email, otp });
            if (res.data.success) {
                setVerifyStatus("✅ OTP verified successfully! Redirecting...");

                // Redirect to MultiStepForm after 2 seconds
                setTimeout(() => {
                    navigate('/userdetails', { state: { email } });
                }, 2000);
            }
        } catch (err) {
            setVerifyStatus(err.response?.data?.message || "❌ Verification failed.");
        }
    };


    return (
        <div className='flex flex-col justify-center items-center pt-5 px-10 gap-5'>
            <div className='flex flex-col gap-5 justify-center items-center'>
                <h2 className='text-2xl md:text-3xl font-semibold text-center'>
                    Open a free demat and trading account online
                </h2>
                <p className='text-gray-500 md:text-2xl text-center'>
                    Start investing brokerage free and join a community of 1.5+ crore investors and traders
                </p>
            </div>

            <div className='flex flex-col md:flex-row gap-5'>
                <div>
                    <img src={Account} className='w-130' alt="account" />
                </div>

                <div className='flex flex-col gap-5'>
                    <h2 className='text-3xl'>Signup now</h2>
                    <p className='text-xl'>Or track your existing application</p>

                    <div className='flex flex-col gap-5'>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border-2 rounded-xl border-gray-400 px-4 py-3 w-80"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {!otpSent ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 rounded-xl cursor-pointer"
                                onClick={sendOtp}
                            >
                                Get OTP
                            </button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="border-2 rounded-xl border-gray-400 px-4 py-3 w-80"
                                />

                                <button
                                    className="bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-xl"
                                    onClick={verifyOtp}
                                >
                                    Verify OTP
                                </button>

                                {/* Status Message */}
                                {verifyStatus && (
                                    <p className={`text-lg text-center font-semibold ${verifyStatus.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                        {verifyStatus}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
