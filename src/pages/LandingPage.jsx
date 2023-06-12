import React from 'react'
import Keyboard from '../assets/imgs/keyboard_500px.png'
import Navbar from '../components/navbar/Navbar'

export default function LandingPage() {
    return (
        <div className='container relative flex-col mx-auto'>
            <Navbar />
            {/* Header */}
            <div className='flex flex-col items-center my-24 justify-between  md:flex-row-reverse'>
                <img className='md:w-1/2' src={Keyboard} alt="keyboardimage" />
                {/* Left Content */}
                <div className='flex flex-col items-center max-w-md md:w-1/2'>
                    <h1 className='text-4xl font-bold text-darkBlue my-10 text-center md:text-left md:self-start'>
                        What's Our Mission
                    </h1>
                    <p className='text-xl self-center text-center md:text-3xl md:text-left '>
                        We exist only to boost your typing speed simple
                    </p>
                </div>
            </div>
        </div>
    )
}
