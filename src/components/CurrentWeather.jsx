import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

export default function CurrentWeather({ current }) {
  if (!current) return null;

  return (
    <div className="flex flex-col items-center mb-8 text-white animate-fade-in">
      <h2 className="text-3xl font-light tracking-wide mb-1 drop-shadow-md text-center">
        {current.name}
      </h2>
      <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
        {current.weather[0].description}
      </p>
      
      <div className="flex items-center justify-center gap-6">
        <div className="drop-shadow-2xl opacity-90 scale-110">
          {getWeatherIcon(current.weather[0].icon, 100)}
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-7xl sm:text-8xl font-extralight tracking-tighter drop-shadow-lg leading-none -ml-2">
            {Math.round(current.main.temp)}°
          </h1>
          <div className="flex gap-4 mt-2 text-white/70 text-sm font-medium">
            <span>H: {Math.round(current.main.temp_max)}°</span>
            <span>L: {Math.round(current.main.temp_min)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
