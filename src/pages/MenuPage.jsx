import React from 'react'
import beginnerImg from '../assets/imgs/beginner.jpg'
import intermediateImg from '../assets/imgs/inter.jpg'
import professionalImg from '../assets/imgs/pro.jpg'
import MenuCard from '../components/menu/MenuCard'
import Navbar from '../components/navbar/Navbar'

export default function MenuPage() {
    return (
        <div className='container flex flex-col mx-auto p-3'>
            <Navbar />
            <>
                <h2 className='self-center text-3xl text-darkBlue font-bold'>Select Your level</h2>
                <div className='container flex flex-col md:flex-row'>
                    <MenuCard img={beginnerImg} text={'Beginner'} />
                    <MenuCard img={intermediateImg} text={'Intermediate'} />
                    <MenuCard img={professionalImg} text={'Professional'} />
                </div>
                <a className='p-3 px-6 pt-2 w-20 my-10 self-center font-bold text-white text-center rounded-full bg-darkBlue hover:bg-lightBlue '
                    href="/">
                    Back
                </a>
            </>
        </div>
    )
}
