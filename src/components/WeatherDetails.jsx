import React from 'react';
import {
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Cloud,
} from 'lucide-react';

const getWindDirection = (deg) => {
  if (deg === undefined) return '';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

const formatTime = (unixTimestamp) => {
  if (!unixTimestamp) return '--:--';
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export default function WeatherDetails({ current, convertTemp, unit = 'C' }) {
  if (!current) return null;

  const feelsLike = convertTemp(current.main.feels_like);
  const actualTemp = convertTemp(current.main.temp);

  const humidityStatus =
    current.main.humidity > 70
      ? 'High moisture'
      : current.main.humidity < 35
      ? 'Dry air'
      : 'Optimal range';

  const visibilityKm = (current.visibility / 1000).toFixed(1);
  const visibilityStatus =
    current.visibility >= 10000 ? 'Clear distance' : 'Reduced visibility';

  const windDir = getWindDirection(current.wind.deg);
  const windSpeedKmh = (current.wind.speed * 3.6).toFixed(1);

  const sunriseTime = formatTime(current.sys?.sunrise);
  const sunsetTime = formatTime(current.sys?.sunset);

  const details = [
    {
      label: 'Feels Like',
      value: `${feelsLike}°${unit}`,
      status: `Actual: ${actualTemp}°${unit}`,
      icon: Thermometer,
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      label: 'Humidity',
      value: `${current.main.humidity}%`,
      status: humidityStatus,
      icon: Droplets,
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      label: 'Wind Speed',
      value: `${windSpeedKmh} km/h`,
      status: windDir ? `Direction: ${windDir} (${current.wind.deg}°)` : 'Gentle breeze',
      icon: Wind,
      iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Visibility',
      value: `${visibilityKm} km`,
      status: visibilityStatus,
      icon: Eye,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Pressure',
      value: `${current.main.pressure} hPa`,
      status: current.main.pressure >= 1013 ? 'Normal atmospheric' : 'Low atmospheric',
      icon: Gauge,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Sun & Daylight',
      value: sunriseTime,
      status: `Sunset: ${sunsetTime}`,
      icon: Sunrise,
      iconColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 h-full">
      {details.map((detail, idx) => {
        const Icon = detail.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900/50 hover:bg-slate-800/60 border border-white/10 hover:border-white/20 rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 backdrop-blur-2xl shadow-xl group"
          >
            {/* Header: Icon & Label */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className={`p-2 rounded-xl border transition-transform duration-200 group-hover:scale-105 ${detail.iconColor}`}
              >
                <Icon size={17} />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {detail.label}
              </h4>
            </div>

            {/* Value & Contextual Tag */}
            <div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
                {detail.value}
              </p>
              <p className="text-[11px] font-medium text-white/40 group-hover:text-white/60 transition-colors">
                {detail.status}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
