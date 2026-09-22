import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';

const API_KEY = "6af0bf46a6a3cc2582107eef6df3f951";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (urlCurrent, urlForecast) => {
    setLoading(true);
    setError('');
    try {
      const [resCurrent, resForecast] = await Promise.all([
        fetch(urlCurrent),
        fetch(urlForecast)
      ]);

      const dataCurrent = await resCurrent.json();
      const dataForecast = await resForecast.json();

      if (dataCurrent.cod !== 200) {
        setError(dataCurrent.message || "City not found");
        setCurrentWeather(null);
        setForecast([]);
      } else {
        setCurrentWeather(dataCurrent);
        setForecast(dataForecast.list.slice(0, 8));
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    fetchWeatherData(urlCurrent, urlForecast);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          fetchWeatherData(urlCurrent, urlForecast);
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans text-white bg-slate-950 selection:bg-white/30">
      {/* Background Video with Overlay */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src={`${import.meta.env.BASE_URL}background.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[8px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[460px] mx-auto p-5 sm:p-8 min-h-screen flex flex-col justify-center animate-slide-down">
        
        {!currentWeather && !loading && (
           <div className="text-center mb-10 mt-6">
              <h1 className="text-5xl font-extralight tracking-tight mb-4 drop-shadow-md">Atmosphere</h1>
              <p className="text-white/60 font-medium tracking-wide text-sm">Find weather for any location</p>
           </div>
        )}

        <SearchBar onSearch={handleSearch} onLocation={handleLocation} />
        
        {error && (
          <div className="text-red-200 text-center mb-6 text-sm font-medium p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-md">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-white/70">
            <div className="w-10 h-10 border-[3px] border-white/20 border-t-white/90 rounded-full animate-spin mb-5"></div>
            <p className="text-xs font-bold uppercase tracking-widest">Gathering data...</p>
          </div>
        )}

        {!loading && currentWeather && (
          <div className="flex flex-col gap-1 w-full animate-fade-in">
            <CurrentWeather current={currentWeather} />
            <WeatherDetails current={currentWeather} />
            <HourlyForecast forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}
