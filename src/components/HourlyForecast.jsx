import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

export default function HourlyForecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-lg animate-fade-in overflow-hidden">
      <div className="flex justify-between items-center mb-5 pl-1">
        <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest">Today's Forecast</h3>
      </div>
      
      <div className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar -mx-2 px-2">
        {forecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          const displayHour = hours === 0 ? '12 AM' : hours < 12 ? `${hours} AM` : hours === 12 ? '12 PM' : `${hours - 12} PM`;
          
          return (
            <div key={index} className="flex flex-col items-center justify-between min-w-[70px] h-[120px] bg-white/5 rounded-2xl py-3 px-2 snap-center border border-white/5 hover:bg-white/10 transition-colors shadow-sm">
              <p className="text-white/80 text-xs font-medium">{displayHour}</p>
              <div className="drop-shadow-md my-2">
                {getWeatherIcon(item.weather[0].icon, 30)}
              </div>
              <p className="text-white text-lg font-medium">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
