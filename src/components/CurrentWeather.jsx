import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons';

export default function CurrentWeather({ current }) {
  if (!current) return null;

  return (
    <div className="animate-fade-in bg-white/10 rounded-2xl p-6 mb-6 text-center shadow-lg border border-white/20 backdrop-blur-md">
      <div className="flex justify-center mb-4">
        {getWeatherIcon(current.weather[0].icon, 80)}
      </div>
      <h1 className="text-5xl font-bold mb-2">
        {Math.round(current.main.temp)}°C
      </h1>
      <h2 className="text-2xl font-medium mb-1">{current.name}, {current.sys.country}</h2>
      <p className="text-gray-200 capitalize mb-6">{current.weather[0].description}</p>

      <div className="flex justify-around items-center border-t border-white/20 pt-4">
        <div className="flex items-center gap-3">
          <Droplets size={28} className="text-blue-300" />
          <div className="text-left">
            <p className="font-bold text-lg leading-tight">{current.main.humidity}%</p>
            <p className="text-sm text-gray-200">Humidity</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Wind size={28} className="text-gray-300" />
          <div className="text-left">
            <p className="font-bold text-lg leading-tight">{(current.wind.speed * 3.6).toFixed(1)} km/h</p>
            <p className="text-sm text-gray-200">Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

