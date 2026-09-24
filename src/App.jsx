import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import { CloudSun } from 'lucide-react';

const API_KEY = "6af0bf46a6a3cc2582107eef6df3f951";
const POPULAR_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
        setForecast(dataForecast.list ? dataForecast.list.slice(0, 8) : []);
      }
    } catch (err) {
      setError("Unable to connect to weather service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
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
          setError("Unable to retrieve your location. Try searching for a city.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Load user location or default city on startup
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          fetchWeatherData(urlCurrent, urlForecast);
        },
        () => {
          handleSearch('London');
        }
      );
    } else {
      handleSearch('London');
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full font-sans text-white bg-slate-950 selection:bg-white/30">
      {/* Background Video with Gradient Backing */}
      <div className="fixed inset-0 w-full h-full -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src={`${import.meta.env.BASE_URL}background.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 min-h-screen flex flex-col justify-between animate-fade-in">
        
        {/* Navigation & Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleSearch('London')}>
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
              <CloudSun size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">Atmosphere</h1>
              <p className="text-[11px] text-white/40 font-medium">Real-time Weather Intelligence</p>
            </div>
          </div>

          {/* Search bar & quick cities */}
          <div className="w-full md:w-auto md:min-w-[360px] lg:min-w-[420px]">
            <SearchBar onSearch={handleSearch} onLocation={handleLocation} />
          </div>
        </header>

        {/* Quick City Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 hide-scrollbar">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40 shrink-0 mr-1">
            Quick Cities:
          </span>
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/5 text-white/70 hover:text-white transition-all duration-150 shrink-0"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="max-w-md mx-auto w-full text-red-200 text-sm text-center mb-6 p-3.5 bg-red-500/15 border border-red-500/30 rounded-2xl shadow-lg backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white">
              <div className="w-10 h-10 border-[3px] border-white/10 border-t-sky-400 rounded-full animate-spin mb-4 shadow-lg"></div>
              <p className="text-white/60 font-medium tracking-widest uppercase text-xs">Loading live weather...</p>
            </div>
          ) : currentWeather ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full animate-fade-in">
              {/* Left Column (Current Weather) */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <CurrentWeather current={currentWeather} />
              </div>

              {/* Right Column (Details & Hourly) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex-1">
                  <WeatherDetails current={currentWeather} />
                </div>
                <div>
                  <HourlyForecast forecast={forecast} />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60">No location selected. Search for a city above.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-2">
          <span>Powered by OpenWeatherMap API</span>
          <span>Atmosphere Weather App</span>
        </footer>

      </div>
    </div>
  );
}
