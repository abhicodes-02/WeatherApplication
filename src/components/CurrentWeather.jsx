import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { MapPin, ArrowUp, ArrowDown, Calendar, Sparkles } from 'lucide-react';

export default function CurrentWeather({ current, convertTemp, unit = 'C', theme }) {
  if (!current) return null;

  const temp = convertTemp(current.main.temp);
  const desc = current.weather[0].description;
  const high = convertTemp(current.main.temp_max);
  const low = convertTemp(current.main.temp_min);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-between h-full min-h-[350px] shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
      {/* Dynamic atmospheric radial glow in background */}
      <div
        className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${theme?.ambientGlow || 'bg-sky-500/15'}`}
      />

      {/* Top Bar: Location & Tag */}
      <div className="flex justify-between items-start relative z-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-400/20">
              <MapPin size={16} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {current.name}
            </h2>
            {current.sys?.country && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/10">
                {current.sys.country}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-white/50 text-xs font-medium pl-0.5">
            <Calendar size={13} className="text-white/40" />
            <span>{today}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-sky-400 font-semibold">
              <Sparkles size={11} /> {theme?.heroTag || 'Live Weather'}
            </span>
          </div>
        </div>

        {/* Hero Condition Icon Tile */}
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner shrink-0 transition-transform duration-300 group-hover:scale-105">
          {getWeatherIcon(current.weather[0].icon, 56)}
        </div>
      </div>

      {/* Main Temp & High/Low Badges */}
      <div className="mt-8 relative z-10">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-7xl sm:text-8xl lg:text-9xl font-extralight tracking-tighter text-white leading-none">
            {temp}°
          </span>
          <span className="text-2xl font-light text-white/40 mb-1">{unit}</span>
          <span className="text-lg sm:text-xl font-medium text-white/80 capitalize pl-2 pb-2">
            {desc}
          </span>
        </div>

        {/* High / Low Range Badges */}
        <div className="flex items-center gap-2.5 mt-5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 shadow-sm">
            <ArrowUp size={13} className="text-rose-400" />
            <span>H: {high}°</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 shadow-sm">
            <ArrowDown size={13} className="text-sky-400" />
            <span>L: {low}°</span>
          </div>
          <div className="text-xs text-white/40 pl-1 font-medium hidden sm:inline">
            Feels like {convertTemp(current.main.feels_like)}°{unit}
          </div>
        </div>
      </div>
    </div>
  );
}
