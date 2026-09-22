import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { Clock } from 'lucide-react';

export default function HourlyForecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Clock size={20} className="text-white/60" />
        <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider">24-Hour Forecast</h3>
      </div>
      
      <div className="flex overflow-x-auto gap-4 lg:gap-6 pb-2 hide-scrollbar">
        {forecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          const displayHour = hours === 0 ? '12 AM' : hours < 12 ? `${hours} AM` : hours === 12 ? '12 PM' : `${hours - 12} PM`;
          
          return (
            <div key={index} className="flex flex-col items-center min-w-[80px]">
              <p className="text-white/70 text-sm font-medium mb-4">{index === 0 ? 'Now' : displayHour}</p>
              <div className="drop-shadow-lg mb-4 opacity-90">
                {getWeatherIcon(item.weather[0].icon, 45)}
              </div>
              <p className="text-white text-2xl font-semibold">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
