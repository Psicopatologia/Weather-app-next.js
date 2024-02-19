import React from 'react'
import { IoIosPartlySunny } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from './SearchBox';
type Props = {}

export default function Navbar({ }: Props) {
    return (
        <nav className='sticky top-0 left-0 z-50 bg-slate-900 px-4'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 p-4'>
                    <h2 className='text-gray-50 text-3xl font-bold'>Weather</h2>
                    <IoIosPartlySunny className='text-gray-50 text-3xl' />
                </div>
                <section className='flex gap-2 items-center text-gray-50'>
                    <MdMyLocation className=' text-gray-50 text-3xl' />
                    <FaLocationDot className=' text-gray-50 text-3xl' />
                    <p>Colombia</p>
                    <div>
                        <SearchBox />
                    </div>
                </section>
            </div>
        </nav>
    )
}