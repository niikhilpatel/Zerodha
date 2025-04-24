import React, { useState } from 'react';
import Account from "../assets/account_open.svg";
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleSendOTP = async () => {
        if (!email || !mobile) {
            return alert("Please enter both email and mobile number");
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
            if (res.status === 200) {
                alert("OTP sent successfully to your email!");
                setOtpSent(true);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            return alert("Please enter the OTP");
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
            if (res.status === 200) {
                alert("OTP verified successfully!");
                setIsVerified(true);
            }
        } catch (err) {
            console.error(err);
            alert("Invalid OTP");
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
                    <img src={Account} className='w-130' alt="Account Illustration" />
                </div>

                <div className='flex flex-col gap-5 mt-0'>
                    <h2 className='text-3xl'>Signup now</h2>
                    <p className='text-xl'>Or track your existing application</p>

                    <div className='flex flex-col justify-center items-center gap-5'>
                        <div className='space-x-3'>
                            <select className='border-2 border-gray-400 rounded-xl px-2 py-3'>
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+1">+1</option>
                            </select>
                            <input
                                type="number"
                                className='border-2 border-gray-400 px-2 py-3 w-50 md:w-80 rounded-xl'
                                placeholder='Enter your mobile number'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className='text-xl font-semibold'>
                                Email :
                                <input
                                    type="email"
                                    className='ml-10 border-2 rounded-xl border-gray-400 px-2 py-3 w-50 md:w-80'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>

                        <button
                            onClick={handleSendOTP}
                            className='border-2 px-16 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-400'
                        >
                            Get OTP
                        </button>

                        {otpSent && (
                            <div className="flex flex-col gap-3 items-center">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="border-2 border-gray-400 px-4 py-2 rounded-xl w-50 md:w-80"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button
                                    onClick={handleVerifyOTP}
                                    className='border-2 px-16 py-3 bg-green-500 text-white rounded-xl hover:bg-green-400'
                                >
                                    Verify OTP
                                </button>
                            </div>
                        )}

                        {isVerified && (
                            <p className="text-green-500 font-semibold">OTP Verified! You can proceed to the next step.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
