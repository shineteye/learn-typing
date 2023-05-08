import React from 'react'

export default function MenuCard({ img, text }) {
    return (
        <div className='container flex flex-col p-6 m-4 '>
            <img className='my-4 rounded-lg' src={img} alt={text + 'img'} />
            <a className='px-5 py-2 font-bold text-center hover:bg-darkBlue text-white bg-mediumBlue rounded-full'
                href="/practice">
                {text}
            </a>
        </div>
    )
}
