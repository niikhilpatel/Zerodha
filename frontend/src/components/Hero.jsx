import React from 'react'
import { useNavigate } from 'react-router-dom'
import Landing from "../assets/landing.png"
import Ecosystem from "../assets/ecosystem.png"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-5 md:mt-20 gap-5 '>
        <img src={Landing} className='md:w-220 w-200' />
        <div className='flex flex-col justify-center items-center gap-5 p-10'>

          <h1 className='text-5xl font-semibold'><span className='text-blue-500'>Invest</span> in everything</h1>
          <p className='text-xl md:text-2xl'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
          <button className='border-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-400' onClick={() => navigate('/signup')}>Sign up for Free</button>
        </div>
      </div>
      <section className='flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 md:px-55 mt-20'>
        <div className='flex-1/3 space-y-5'>
          <h1 className='text-3xl font-semibold'>Trust with confidence</h1>
          <div className='flex flex-col gap-6 text-gray-600'>
            <div>
              <h2 className='text-2xl font-semibold'>Customer-first always</h2>
              <p className='text-lg text-gray-500'>That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
            </div>
            <div>
              <h2 className='text-2xl font-semibold'>No spam or gimmicks</h2>
              <p className='text-lg text-gray-500'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
            </div>
            <div>
              <h2 className='text-2xl font-semibold'>The Zerodha universe
              </h2>
              <p className='text-lg text-gray-500'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.

              </p>
            </div>
            <div>
              <h2 className='text-2xl font-semibold'>Do better with money
              </h2>
              <p className='text-lg text-gray-500'>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.

              </p>
            </div>
          </div>

        </div>
        <div className='flex-1/3'>
          <img src={Ecosystem} className='md:w-220 w-200' />

        </div>

      </section>
    </>
  )
}

export default Hero
