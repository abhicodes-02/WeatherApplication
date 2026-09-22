import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { MapPin } from 'lucide-react';

export default function CurrentWeather({ current }) {
  if (!current) return null;
  const temp = Math.round(current.main.temp);
  const desc = current.weather[0].description;
  const high = Math.round(current.main.temp_max);
  const low = Math.round(current.main.temp_min);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between h-full min-h-[350px] shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white flex items-center gap-2 mb-2">
            <MapPin size={24} className="text-white/70" />
            {current.name}
          </h2>
          <p className="text-white/60 text-lg capitalize font-medium">{desc}</p>
        </div>
        <div className="drop-shadow-2xl opacity-90">
          {getWeatherIcon(current.weather[0].icon, 80)}
        </div>
      </div>

      <div className="mt-12 relative z-10">
        <h1 className="text-[7rem] lg:text-[8rem] font-light tracking-tighter text-white leading-none -ml-3">
          {temp}°
        </h1>
        <div className="flex gap-4 text-white/70 mt-4 text-lg font-medium">
          <span>High: {high}°</span>
          <span>Low: {low}°</span>
        </div>
      </div>
    </div>
  );
}
