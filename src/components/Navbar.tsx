import React from 'react'
import { IoIosPartlySunny } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from './SearchBox';
type Props = {}

export default function Navbar({ }: Props) {
    return (
        <nav className='sticky top-0 left-0 z-50 flex justify-center w-full px-4 bg-gradient-to-b from-neutral-950 to-neutral-900'>
            <div className='flex justify-between max-w-7xl w-full items-center'>
                <div className='flex gap-2 py-4 items-center'>
                    <h2 className='text-3xl font-bold'>Weather</h2>
                    <IoIosPartlySunny className='text-3xl text-yellow-500' />
                </div>
                <section className='flex gap-2 items-center text-neutral-50'>
                    <MdMyLocation className='text-xl text-neutral-50/50' />
                    <FaLocationDot className='text-2xl ' />
                    <p>Colombia</p>
                    <div>
                        <SearchBox />
                    </div>
                </section>
            </div>
        </nav>
    )
}