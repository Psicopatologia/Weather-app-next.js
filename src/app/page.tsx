"use client";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import getDayOrNightIcon from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

type WeatherDetail = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<WeatherDetail>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};


export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=medellin&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      )
      return data;
    }
  })

  const firstData = data?.list[0];
  console.log(data);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiOutlineLoading className="text-slate-800 animate-spin text-3xl" />
      </div>
    )
  }

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="text-neutral-50 min-h-screen bg-neutral-950 ">
      <Navbar />
      <main className="p-4 max-w-7xl flex flex-col gap-8 w-full mx-auto">
        <section className="space-y-4">
          {/* todays data */}
          <div className="space-y-2">
            <h2 className="flex gap-2 items-end">
              <p className="text-2xl font-bold ">{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-lg">{format(parseISO(firstData?.dt_txt ?? ''), 'dd/MM/yyyy')}</p>
            </h2>
            <div>
              <Container className="gap-10 px-6 items-center">
                {/* temperature */}
                <div className="flex flex-col px-4">
                  <span className="text-5xl ">
                    {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels like</span>
                    <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°</span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓</span>
                    <span>{convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑</span>
                  </p>
                </div>

                {/* time and weather icon */}
                <div className="flex gap-10 py-2 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), 'hh:mm a')}</p>
                      <WeatherIcon iconName={getDayOrNightIcon(d?.weather[0].icon, d.dt_txt)} />
                      <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
          <div className="flex gap-4">
            <Container className="w-fit items-center flex flex-col px-4">
              <p className="capitalize">{firstData?.weather[0].description}</p>
              <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')} />
            </Container>
            <Container className="bg-yellow-500 justify-around shadow-inner shadow-yellow-500 px-4 gap-4 overflow-x-auto">
              <WeatherDetails
                visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 3)}
                sunrise={format(fromUnixTime(data?.city.sunrise ?? 1708341477), "H:mm")}
                sunset={format(fromUnixTime(data?.city.sunset ?? 1708384478), "H:mm")}

              />
            </Container>
          </div>
        </section>
        {/* 7 day forecast data */}
        <section>
          <h2 className="flex gap-2 items-end">
            <p className="text-2xl font-bold ">Forecast</p>
            <p className="text-lg">(7 days)</p>
          </h2>
        </section>
      </main>
    </div>
  );
}
