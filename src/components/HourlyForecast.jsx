import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

export default function HourlyForecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="animate-fade-in bg-white/10 rounded-2xl p-4 shadow-lg border border-white/20 backdrop-blur-md">
      <h3 className="font-semibold text-lg mb-3 pl-2">Hourly Forecast</h3>
      <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
        {forecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          const displayHour = hours === 0 ? '12 AM' : hours < 12 ? `${hours} AM` : hours === 12 ? '12 PM' : `${hours - 12} PM`;
          
          return (
            <div key={index} className="flex flex-col items-center min-w-[70px] snap-center">
              <p className="text-sm text-gray-200 mb-2">{displayHour}</p>
              <div className="mb-2">
                {getWeatherIcon(item.weather[0].icon, 36)}
              </div>
              <p className="font-bold text-lg">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

