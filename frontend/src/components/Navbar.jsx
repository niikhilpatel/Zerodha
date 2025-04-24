import React from 'react'
import Logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate()

    return (
        <div className='flex py-10 px-30 md:px-5 justify-between'>
            <div>
                <img onClick={() => navigate('/')} src={Logo} className='w-40 cursor-pointer'/>
            </div>
            <div>
                <ul className='hidden md:visible flex justify-between gap-10 pr-15'>
                    <li>signup</li>
                    <li>About</li>
                    <li>Product</li>
                    <li>Pricing</li>
                    <li>Support</li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar