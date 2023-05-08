import React from 'react'
import Keyboard from '../../assets/imgs/keyboard_500px.png'
import MainIcon from '../mainIcon/MainIcon'


function Navbar() {
    return (
        <div className='container relative flex-col mx-auto'>
            <div className='flex flex-col my-4 items-center justify-between md:flex-row '>
                {/* Logo */}
                <MainIcon />
                {/* Routes or Links */}
                <div className='flex flex-row my-4 text-xl '>
                    <a href="home" className='hover:text-darkBlue mx-2'>Home</a>
                    <a href="menu" className='hover:text-darkBlue mx-2'>Menu</a>
                    <a href="practice" className='hover:text-darkBlue mx-2'>Practice</a>
                    <a href="progress" className='hover:text-darkBlue mx-2'>Progress</a>
                </div>
            </div>
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

export default Navbar
