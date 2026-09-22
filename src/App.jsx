import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
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
        // We only want the next 8 items (approx 24 hours since each item is 3 hours apart)
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
    <div className="relative min-h-screen w-full flex justify-center items-center p-4">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 min-w-full min-h-full object-cover -z-10"
      >
        <source src={`${import.meta.env.BASE_URL}Night Sky video background.mp4`} type="video/mp4" />
      </video>

      {/* Main Container */}
      <div className="w-full max-w-md animate-slide-down">
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">Weather App</h1>
        
        <div className="bg-black/30 p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
          <SearchBar onSearch={handleSearch} onLocation={handleLocation} />
          
          {error && (
            <div className="text-red-400 text-center mb-4 font-semibold p-2 bg-red-400/10 rounded-lg">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center text-white my-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
              <p>Fetching weather...</p>
            </div>
          )}

          {!loading && currentWeather && (
            <>
              <CurrentWeather current={currentWeather} />
              <HourlyForecast forecast={forecast} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

