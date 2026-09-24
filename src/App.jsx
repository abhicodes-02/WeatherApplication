import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { getWeatherTheme } from './utils/weatherThemes';
import { CloudSun, RefreshCw } from 'lucide-react';

const API_KEY = "6af0bf46a6a3cc2582107eef6df3f951";
const DEFAULT_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState('C'); // 'C' | 'F'
  const [recentCities, setRecentCities] = useState(() => {
    try {
      const saved = localStorage.getItem('atmosphere_recent_cities');
      return saved ? JSON.parse(saved) : DEFAULT_CITIES;
    } catch {
      return DEFAULT_CITIES;
    }
  });

  // Temperature converter helper
  const convertTemp = (celsius) => {
    if (celsius === undefined || celsius === null) return '--';
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  // Compute active theme from current condition
  const theme = useMemo(() => {
    const icon = currentWeather?.weather?.[0]?.icon || '01d';
    return getWeatherTheme(icon);
  }, [currentWeather]);

  // Save city to recents
  const saveRecentCity = (cityName) => {
    if (!cityName) return;
    setRecentCities((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      const updated = [cityName, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('atmosphere_recent_cities', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Parse 5-day daily data from the 40-step 3-hour list
  const parseDailyData = (list = []) => {
    const daysMap = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0];

      if (!daysMap[dateKey]) {
        daysMap[dateKey] = {
          date,
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          icon: item.weather[0].icon,
          pop: item.pop || 0,
          itemsCount: 1,
        };
      } else {
        const d = daysMap[dateKey];
        d.minTemp = Math.min(d.minTemp, item.main.temp_min);
        d.maxTemp = Math.max(d.maxTemp, item.main.temp_max);
        if (item.pop > d.pop) d.pop = item.pop;
        // Use midday icon if available (between 11:00 and 15:00)
        const hour = date.getHours();
        if (hour >= 11 && hour <= 15) {
          d.icon = item.weather[0].icon;
        }
      }
    });

    return Object.values(daysMap).slice(0, 5);
  };

  const fetchWeatherData = async (urlCurrent, urlForecast, queryName = '') => {
    setLoading(true);
    setError('');
    try {
      const [resCurrent, resForecast] = await Promise.all([
        fetch(urlCurrent),
        fetch(urlForecast),
      ]);

      const dataCurrent = await resCurrent.json();
      const dataForecast = await resForecast.json();

      if (dataCurrent.cod !== 200) {
        setError(dataCurrent.message || 'City not found');
        setLoading(false);
        return;
      }

      setCurrentWeather(dataCurrent);

      if (dataForecast.list) {
        setHourlyForecast(dataForecast.list.slice(0, 8));
        setDailyForecast(parseDailyData(dataForecast.list));
      }

      saveRecentCity(dataCurrent.name);
    } catch (err) {
      setError('Unable to load weather information. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (!city) return;
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    fetchWeatherData(urlCurrent, urlForecast, city);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          fetchWeatherData(urlCurrent, urlForecast);
        },
        () => {
          setError('Location access was denied. Search for your city above.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // On initial mount, load location or fallback
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
    <div className={`relative min-h-screen w-full font-sans text-white bg-slate-950 transition-colors duration-1000`}>
      {/* Dynamic Atmospheric Canvas Background */}
      <div
        className={`fixed inset-0 w-full h-full -z-20 bg-gradient-to-br ${theme.background} transition-colors duration-1000`}
      >
        {/* Ambient atmospheric lighting orbs */}
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${theme.ambientGlow}`}
        />
        <div
          className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${theme.ambientGlow}`}
        />

        {/* Video texture blend */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-25 mix-blend-screen"
        >
          <source src={`${import.meta.env.BASE_URL}background.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />
      </div>

      {/* Main App Container */}
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col justify-between animate-fade-in">
        
        {/* Navigation Bar */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          {/* Brand Logo & Live Indicator */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none self-start md:self-auto"
            onClick={() => handleSearch(currentWeather?.name || 'London')}
            title="Refresh weather"
          >
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-sky-400/40 text-sky-400 transition-all duration-200 group-hover:scale-105 shadow-lg">
              <CloudSun size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                  Atmosphere
                </h1>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-white/40 font-medium tracking-wide">
                Live Atmospheric Dashboard
              </p>
            </div>
          </div>

          {/* Search Bar + Geolocation + Unit Toggle */}
          <div className="w-full md:w-auto md:min-w-[420px] lg:min-w-[480px]">
            <SearchBar
              onSearch={handleSearch}
              onLocation={handleLocation}
              unit={unit}
              onToggleUnit={toggleUnit}
            />
          </div>
        </header>

        {/* Quick Recent City Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 custom-scrollbar">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40 shrink-0 mr-1">
            Locations:
          </span>
          {recentCities.map((city) => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-150 shrink-0 ${
                currentWeather?.name?.toLowerCase() === city.toLowerCase()
                  ? 'bg-sky-500/20 border-sky-400/40 text-sky-300 font-semibold shadow-sm'
                  : 'bg-white/5 hover:bg-white/15 border-white/5 text-white/70 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="max-w-md mx-auto w-full text-red-200 text-xs sm:text-sm text-center mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-2xl shadow-lg backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-white">
              <div className="relative mb-5">
                <div className="w-12 h-12 border-2 border-white/10 border-t-sky-400 rounded-full animate-spin" />
                <CloudSun size={20} className="absolute inset-0 m-auto text-sky-400" />
              </div>
              <p className="text-white/60 font-medium tracking-widest uppercase text-xs">
                Scanning satellite radar...
              </p>
            </div>
          ) : currentWeather ? (
            <div className="flex flex-col gap-6 w-full animate-fade-in">
              {/* Row 1: Hero Current Weather (5 cols) + Weather Details (7 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <div className="lg:col-span-5 flex flex-col">
                  <CurrentWeather
                    current={currentWeather}
                    convertTemp={convertTemp}
                    unit={unit}
                    theme={theme}
                  />
                </div>
                <div className="lg:col-span-7 flex flex-col">
                  <WeatherDetails
                    current={currentWeather}
                    convertTemp={convertTemp}
                    unit={unit}
                  />
                </div>
              </div>

              {/* Row 2: 24-Hour Forecast (7 cols) + 5-Day Forecast (5 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <div className="lg:col-span-7 flex flex-col">
                  <HourlyForecast
                    forecast={hourlyForecast}
                    convertTemp={convertTemp}
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col">
                  <DailyForecast
                    dailyData={dailyForecast}
                    unit={unit}
                    convertTemp={convertTemp}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-2">
          <span>Powered by OpenWeatherMap Intelligence</span>
          <span className="flex items-center gap-1.5">
            Atmosphere v2.0 • Modern Glass Edition
          </span>
        </footer>

      </div>
    </div>
  );
}
