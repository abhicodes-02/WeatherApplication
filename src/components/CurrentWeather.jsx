import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { MapPin, ArrowUp, ArrowDown, Calendar } from 'lucide-react';

export default function CurrentWeather({ current }) {
  if (!current) return null;
  const temp = Math.round(current.main.temp);
  const desc = current.weather[0].description;
  const high = Math.round(current.main.temp_max);
  const low = Math.round(current.main.temp_min);

  // Formatted current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-between h-full min-h-[340px] shadow-xl backdrop-blur-2xl relative overflow-hidden">
      {/* Subtle ambient glow in top-right */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Location & Date */}
      <div className="flex justify-between items-start relative z-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 rounded-lg bg-sky-500/10 text-sky-400">
              <MapPin size={16} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {current.name}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-white/70">
              {current.sys?.country}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-white/50 text-xs font-medium pl-0.5">
            <Calendar size={13} className="text-white/40" />
            <span>{today}</span>
          </div>
        </div>

        {/* Weather Icon */}
        <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 shadow-inner shrink-0">
          {getWeatherIcon(current.weather[0].icon, 56)}
        </div>
      </div>

      {/* Main Temperature & Weather Details */}
      <div className="mt-8 relative z-10">
        <div className="flex items-baseline gap-2">
          <span className="text-7xl lg:text-8xl font-extralight tracking-tighter text-white leading-none">
            {temp}°
          </span>
          <span className="text-lg lg:text-xl font-medium text-white/70 capitalize pb-2">
            {desc}
          </span>
        </div>

        {/* High / Low Badges */}
        <div className="flex items-center gap-2.5 mt-5">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-semibold text-white/80">
            <ArrowUp size={13} className="text-rose-400" />
            <span>High {high}°</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-semibold text-white/80">
            <ArrowDown size={13} className="text-sky-400" />
            <span>Low {low}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
