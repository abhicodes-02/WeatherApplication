import React, { useRef } from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { Clock, ChevronLeft, ChevronRight, Droplets } from 'lucide-react';

export default function HourlyForecast({ forecast }) {
  const scrollRef = useRef(null);

  if (!forecast || forecast.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 lg:p-6 backdrop-blur-2xl shadow-xl">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-white/5 text-sky-400">
            <Clock size={16} />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Hourly Forecast
          </h3>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 pb-2 custom-scrollbar scroll-smooth"
      >
        {forecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          const displayHour = hours === 0 ? '12 AM' : hours < 12 ? `${hours} AM` : hours === 12 ? '12 PM' : `${hours - 12} PM`;
          const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
          const isNow = index === 0;
          const pop = item.pop ? Math.round(item.pop * 100) : 0;

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-between min-w-[90px] w-[90px] py-3.5 px-2.5 rounded-2xl border transition-all duration-200 shrink-0 ${
                isNow
                  ? 'bg-sky-500/10 border-sky-400/30 shadow-md shadow-sky-500/5'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/5 hover:border-white/15'
              }`}
            >
              {/* Date & Time */}
              <div className="flex flex-col items-center">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
                    isNow ? 'text-sky-400' : 'text-white/40'
                  }`}
                >
                  {isNow ? 'Now' : weekday}
                </span>
                <span className="text-xs font-semibold text-white/90">
                  {isNow ? 'Today' : displayHour}
                </span>
              </div>

              {/* Weather Icon & Precipitation */}
              <div className="my-2.5 flex flex-col items-center">
                <div className="transition-transform duration-200 hover:scale-110">
                  {getWeatherIcon(item.weather[0].icon, 34)}
                </div>
                {pop > 10 && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-sky-300 mt-1">
                    <Droplets size={10} className="text-sky-400" />
                    {pop}%
                  </span>
                )}
              </div>

              {/* Temperature */}
              <div className="text-base font-bold text-white tracking-tight">
                {Math.round(item.main.temp)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
