import React from 'react'
import { MdVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaTachometerAlt, FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { RiWaterPercentFill } from "react-icons/ri";
export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6:20",
        sunset = "18:48",
    } = props;
    return (
        <>
            <SingleWeatherDeail
                icon={<MdVisibility />}
                information='Visibility'
                value={visibility}
            />
            <SingleWeatherDeail
                icon={<RiWaterPercentFill />}
                information='Humidity'
                value={humidity}
            />
            <SingleWeatherDeail
                icon={<FaWind />}
                information='Wind Speed'
                value={windSpeed}
            />
            <SingleWeatherDeail
                icon={<FaTachometerAlt />}
                information='Air Pressure'
                value={airPressure}
            />
            <SingleWeatherDeail
                icon={<GiSunrise />}
                information='Sunrise'
                value={sunrise}
            />
            <SingleWeatherDeail
                icon={<GiSunset />}
                information='Sunset'
                value={sunset}
            />
        </>
    )
}

export interface SingleWeatherDeailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDeail(props: SingleWeatherDeailProps) {
    return (
        <div className='flex flex-col justify-around gap-2 items-center text-xs font-semibold'>
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}