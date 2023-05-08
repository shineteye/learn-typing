import React from 'react'
import beginImage from '../../assets/imgs/beginner.jpg'

export default function MenuCard() {
    return (
        <div className='container flex flex-col items-center px-5 py-5 my-3 mx-6 bg-lightBlue'>
            <img className='my-4' src={beginImage} alt="beginnerimg" />
            <a className='px-5 py-2 font-bold text-mediumBlue bg-white rounded-full' href="/practice">
                Beginner
            </a>
        </div>
    )
}
