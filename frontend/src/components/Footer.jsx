import React from 'react'
import Logo from "../assets/logo.svg"
import { FaTimes, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaTelegram } from "react-icons/fa"


const Footer = () => {
    return (
        <footer className='md:px-55 px-5 py-10 space-y-10'>

            <div className='flex justify-between  gap-5 mt-20'>
                <div className='flex flex-col gap-5'>
                    <img src={Logo} className='w-40' />
                    <p className='text-gray-500'>© 2010 - 2025, Zerodha Broking Ltd. <br /> All rights reserved.</p>
                    <div className='flex gap-3 mt-2'>
                        <FaTimes className='w-6 h-6 cursor-pointer' />
                        <FaFacebook className='w-6 h-6 cursor-pointer' />
                        <FaInstagram className='w-6 h-6 cursor-pointer' />
                        <FaLinkedin className='w-6 h-6 cursor-pointer' />
                    </div>
                    <div className='flex gap-3 mt-2'>
                        <FaYoutube className='w-6 h-6 cursor-pointer' />
                        <FaWhatsapp className='w-6 h-6 cursor-pointer' />
                        <FaTelegram className='w-6 h-6 cursor-pointer' />
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-lg'>Company</h3>
                    <p>About</p>
                    <p>Products</p>
                    <p>Pricing</p>
                    <p>Referral programme</p>
                    <p>Careers</p>
                    <p>Zerodha.tech</p>
                    <p>Open source</p>
                    <p>Press & media</p>
                    <p>Zerodha Cares (CSR)</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-lg'>Support</h3>
                    <p>Contact us</p>
                    <p>Support portal</p>
                    <p>Z-Connect</p>
                    <p>Blog</p>
                    <p>List of charges</p>
                    <p>Downloads & resources</p>
                    <p>Videos</p>
                    <p>Market overview</p>
                    <p>How to file a complaint?</p>
                    <p>Status of your complaints</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-lg'>More</h3>
                    <p className='text-lg'>Account Open an account</p>
                    <p className='text-lg'>Fund transfer</p>
                </div>
            </div>
            <div className='flex flex-col gap-3 text-gray-400  text-[12px]'>
                <p>Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>
                <p>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances</p>
                <p className='text-blue-500'>Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>
                <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
                <p>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
                <p>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>
                <div className='flex justify-center gap-5 text-[14px]'>
                    <a href="https://zerodha.com/nse" target="_blank" rel="noreferrer">NSE</a>
                    <a href="https://zerodha.com/bse" target="_blank" rel="noreferrer">BSE</a>
                    <a href="https://zerodha.com/mcx" target="_blank" rel="noreferrer">MCX</a>
                    <a href="https://zerodha.com/terms-and-conditions" target="_blank" rel="noreferrer">Terms & conditions</a>
                    <a href="https://zerodha.com/policies-procedures" target="_blank" rel="noreferrer">Policies & procedures</a>
                    <a href="https://zerodha.com/privacy-policy" target="_blank" rel="noreferrer">Privacy policy</a>
                    <a href="https://zerodha.com/disclosure" target="_blank" rel="noreferrer">Disclosure</a>
                    <a href="https://zerodha.com/for-investors-attention" target="_blank" rel="noreferrer">For investor's attention</a>
                    <a href="https://zerodha.com/investor-charter" target="_blank" rel="noreferrer">Investor charter</a>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer