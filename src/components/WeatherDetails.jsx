import React from 'react';
import { Droplets, Wind, Thermometer, Eye, Gauge, Cloud } from 'lucide-react';

const getWindDirection = (deg) => {
  if (deg === undefined) return '';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

export default function WeatherDetails({ current }) {
  if (!current) return null;

  const humidityStatus =
    current.main.humidity > 70
      ? 'High moisture'
      : current.main.humidity < 30
      ? 'Dry air'
      : 'Comfortable';

  const visibilityKm = (current.visibility / 1000).toFixed(1);
  const visibilityStatus =
    current.visibility >= 10000 ? 'Clear view' : 'Hazy conditions';

  const windDir = getWindDirection(current.wind.deg);

  const details = [
    {
      label: 'Feels Like',
      value: `${Math.round(current.main.feels_like)}°`,
      status: `Actual: ${Math.round(current.main.temp)}°`,
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
      value: `${(current.wind.speed * 3.6).toFixed(1)} km/h`,
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
      label: 'Cloudiness',
      value: `${current.clouds.all}%`,
      status: current.clouds.all > 75 ? 'Heavy overcast' : current.clouds.all > 25 ? 'Partly cloudy' : 'Clear skies',
      icon: Cloud,
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5 h-full">
      {details.map((detail, idx) => {
        const Icon = detail.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900/60 hover:bg-slate-800/60 border border-white/10 hover:border-white/20 rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 backdrop-blur-2xl shadow-xl group"
          >
            {/* Header: Icon & Label */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className={`p-2 rounded-xl border transition-transform duration-200 group-hover:scale-105 ${detail.iconColor}`}
              >
                <Icon size={18} />
              </div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {detail.label}
              </h4>
            </div>

            {/* Value & Dynamic Status */}
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
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
