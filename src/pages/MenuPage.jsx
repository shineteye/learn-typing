import React from 'react'
import MenuCard from '../components/menu/MenuCard'

export default function MenuPage() {
    return (
        <div className='container flex flex-col items-center justify-between mx-auto md:flex-row md:space-x-6 '>
            <div className='flex flex-col items-center'>
                <a className='p-3 px-6 pt-2 font-bold text-white bg-darkBlue hover:bg-lightBlue rounded-full' href="/practice">
                    Beginner
                </a>
                <MenuCard />
                <MenuCard />
                <MenuCard />
            </div>
        </div>
    )
}
