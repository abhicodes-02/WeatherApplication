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
      {/* Background Video with Dark Overlay */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={`${import.meta.env.BASE_URL}background.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl"></div>
      </div>

      {/* Main Container - Responsive Bento Grid */}
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 min-h-screen flex flex-col justify-center animate-fade-in">
        
        {/* Empty State */}
        {!currentWeather && !loading && (
           <div className="text-center my-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">Atmosphere</h1>
              <div className="max-w-xl mx-auto shadow-2xl">
                <SearchBar onSearch={handleSearch} onLocation={handleLocation} />
              </div>
           </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center my-auto text-white">
            <div className="w-12 h-12 border-[4px] border-white/10 border-t-white/90 rounded-full animate-spin mb-6 shadow-lg"></div>
            <p className="text-white/60 font-medium tracking-widest uppercase text-sm">Gathering Data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto w-full text-red-200 text-center mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl shadow-lg">
            {error}
          </div>
        )}

        {/* Populated State - Bento Grid */}
        {!loading && currentWeather && (
          <div className="w-full h-full flex flex-col gap-6 lg:gap-8">
            
            {/* Top Search Bar */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:w-[450px] shadow-xl">
              <SearchBar onSearch={handleSearch} onLocation={handleLocation} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full">
              
              {/* Left Column (Current Weather) */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <CurrentWeather current={currentWeather} />
              </div>

              {/* Right Column (Details & Hourly) */}
              <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
                <div className="flex-1 min-h-[250px]">
                  <WeatherDetails current={currentWeather} />
                </div>
                <div>
                  <HourlyForecast forecast={forecast} />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
