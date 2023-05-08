import React from 'react'
import TypingLogo from '../../assets/imgs/blog_480px.png'
export default function MainIcon() {
    return (
        <div className='flex flex-row items-center mx-3 md:w-1/2'>
            <img className='w-12 mx-3' src={TypingLogo} alt="TypingLogo" />
            <h3 className='text-2xl font-bold text-darkBlue'>Learn-Typing</h3>
        </div>
    )
}
