import React from 'react'
import Keyboard from '../assets/imgs/keyboard_500px.png'
import Navbar from '../components/navbar/Navbar'

export default function LandingPage() {
    return (
        <div className='container relative flex-col mx-auto'>
            <Navbar />
            {/* Header */}
            <div className='flex flex-col items-center my-24  md:flex-row-reverse'>
                <img className='' src={Keyboard} alt="keyboardimage" />
                {/* Left Content */}
                <div className='flex flex-col items-center max-w-md md:w-1/2'>
                    <h1 className='text-4xl font-bold text-darkBlue my-10 text-center md:text-left'>
                        What's Our Mission
                    </h1>
                    <p className='text-xl md:text-3xl md:text-left'>
                        We exist only to boost your typing speed
                    </p>
                </div>

            </div>
        </div>
    )
}
