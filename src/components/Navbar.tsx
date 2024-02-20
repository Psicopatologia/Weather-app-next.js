'use client'

import React, { useState } from 'react'
import { IoIosPartlySunny } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from './SearchBox';
import axios from 'axios';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';
type Props = {
    location: string
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar(props: Props) {
    const [city, setCity] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [suggestions, setSuggestions] = useState<{ name: string, country: string }[]>([]);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const [place, setPlace] = useAtom(placeAtom);
    const [_, setLoadingCity] = useAtom(loadingCityAtom);

    async function handleInputChange(value: string) {
        setCity(value);
        if (value.length >= 3) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
                )

                const suggestions = response.data.list.map(
                    (item: any) => ({ name: item.name, country: item.sys.country })
                )
                console.log(response.data.list);

                setSuggestions(suggestions);
                setError('');
                setShowSuggestion(true);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestion(false)
            }
        } else {
            setSuggestions([]);
            setShowSuggestion(false)
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestion(false)
    }

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        setLoadingCity(true)
        e.preventDefault();
        if (suggestions.length === 0) {
            setError("Location not found");
            setLoadingCity(false);
        } else {
            setError("");
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestion(false);
            }, 500)
        }
    }

    function handleUseCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    setLoadingCity(true)
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                    )
                    setTimeout(() => {
                        setLoadingCity(false);
                        setPlace(response.data.name)
                    }, 500)
                } catch (error) {
                    setLoadingCity(false);
                }
            })
        }
    }

    return (
        <>
            <nav className='sticky top-0 left-0 z-50 flex justify-center w-full px-4 bg-gradient-to-b from-neutral-950 to-neutral-900 shadow-md shadow-neutral-950'>
                <div className='flex justify-between max-w-7xl w-full items-center'>
                    <div className='flex gap-2 py-4 items-center'>
                        <h2 className='text-3xl font-bold'>Weather</h2>
                        <IoIosPartlySunny className='text-3xl text-yellow-500' />
                    </div>
                    <section className='flex gap-2 items-center text-neutral-50'>
                        <MdMyLocation
                            onClick={handleUseCurrentLocation}
                            title='Use current location'
                            className='transition-color text-xl text-neutral-50/50 hover:text-neutral-50 cursor-pointer'
                        />
                        <FaLocationDot className='text-2xl ' />
                        <p>{props.location}</p>
                        <div className='relative hidden md:flex'>
                            <SearchBox
                                value={city}
                                className={`${(showSuggestion && suggestions.length >= 1) ? 'rounded-b-none' : ''}`}
                                onChange={e => handleInputChange(e.target.value)}
                                onSubmit={handleSubmitSearch}
                            />
                            <SuggestionBox
                                {...{
                                    showSuggestion,
                                    handleSuggestionClick,
                                    suggestions,
                                    error
                                }}
                            />
                        </div>
                    </section>
                </div>
            </nav>
            <section className='flex justify-end md:hidden max-w-7xl p-3'>
                <div className='relative '>
                    <SearchBox
                        value={city}
                        className={`${(showSuggestion && suggestions.length >= 1) ? 'rounded-b-none' : ''}`}
                        onChange={e => handleInputChange(e.target.value)}
                        onSubmit={handleSubmitSearch}
                    />
                    <SuggestionBox
                        {...{
                            showSuggestion,
                            handleSuggestionClick,
                            suggestions,
                            error
                        }}
                    />
                </div>
            </section>
        </>
    )
}

function SuggestionBox({
    showSuggestion,
    suggestions,
    handleSuggestionClick,
    error
}: {
    showSuggestion: boolean;
    suggestions: { name: string, country: string }[];
    handleSuggestionClick: (item: string) => void;
    error: string
}) {
    return (
        <>
            {
                ((showSuggestion && suggestions.length >= 1) || error) &&
                <ul className='mb-4 py-2 border border-neutral-900 absolute left-0 bg-neutral-900 rounded-b-lg w-full'>
                    {(error && suggestions.length < 1) &&
                        <li className='text-red-600 font-bold px-4 py-2'>{error}</li>
                    }
                    {
                        suggestions.map((city, i) => (
                            <li
                                key={i}
                                onClick={() => handleSuggestionClick(city.name)}
                                className='hover:bg-neutral-950 px-4 cursor-pointer py-2'
                            >
                                {city.name} ({city.country})
                            </li>
                        ))
                    }
                </ul>
            }
        </>
    )
}