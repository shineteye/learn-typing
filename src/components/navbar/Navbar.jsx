import React from 'react'

import MainIcon from '../mainIcon/MainIcon'


function Navbar() {
    return (
        <div className='flex flex-col my-4 items-center justify-between md:flex-row '>
            {/* Logo */}
            <MainIcon />
            {/* Routes or Links */}
            <div className='flex flex-row my-4 text-xl '>
                <a href="/" className='hover:text-darkBlue mx-2'>Home</a>
                <a href="menu" className='hover:text-darkBlue mx-2'>Menu</a>
                <a href="practice" className='hover:text-darkBlue mx-2'>Practice</a>
                <a href="progress" className='hover:text-darkBlue mx-2'>Progress</a>
            </div>
        </div>
    )
}

export default Navbar
