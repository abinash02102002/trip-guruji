import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    < div className="flex items-center flex-col mx-56 gap-9 ">

      <h2 className='font-extrabold text-[50px] text-center mt-16 '>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h2>
      <p className='text-xl text-gray-500 text-centerr'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link  to="/create-trip">

      <Button> Get Started.it's free</Button>
      </Link>
    </div>
  )
}
