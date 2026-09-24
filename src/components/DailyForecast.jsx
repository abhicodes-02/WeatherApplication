import React from 'react';
import { Calendar, Droplets } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons';

export default function DailyForecast({ dailyData = [], unit = 'C', convertTemp }) {
  if (!dailyData || dailyData.length === 0) return null;

  // Calculate overall min and max across all 5 days for the relative slider bars
  const allMins = dailyData.map((d) => d.minTemp);
  const allMaxs = dailyData.map((d) => d.maxTemp);
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const rangeSpan = Math.max(globalMax - globalMin, 1);

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-5 lg:p-6 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
          <Calendar size={16} />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
          5-Day Forecast
        </h3>
      </div>

      {/* Daily Rows */}
      <div className="flex flex-col divide-y divide-white/5">
        {dailyData.map((day, idx) => {
          const isToday = idx === 0;
          // Calculate bar offsets
          const leftPercent = Math.max(0, Math.min(100, ((day.minTemp - globalMin) / rangeSpan) * 100));
          const rightPercent = Math.max(0, Math.min(100, ((globalMax - day.maxTemp) / rangeSpan) * 100));
          const pop = day.pop ? Math.round(day.pop * 100) : 0;

          return (
            <div
              key={idx}
              className="py-3 flex items-center justify-between gap-3 text-sm transition-colors hover:bg-white/[0.02] px-1 rounded-xl"
            >
              {/* Day Label */}
              <div className="w-16 shrink-0">
                <span className={`font-semibold ${isToday ? 'text-sky-400' : 'text-white/80'}`}>
                  {isToday ? 'Today' : day.dayName}
                </span>
              </div>

              {/* Icon & Rain Chance */}
              <div className="flex items-center gap-1.5 w-14 shrink-0 justify-center">
                <div className="scale-90">
                  {getWeatherIcon(day.icon, 24)}
                </div>
                {pop > 15 ? (
                  <span className="text-[10px] font-bold text-sky-400 flex items-center">
                    {pop}%
                  </span>
                ) : null}
              </div>

              {/* Min Temp */}
              <span className="w-9 text-right text-xs font-medium text-white/50 shrink-0">
                {convertTemp(day.minTemp)}°
              </span>

              {/* Apple-style Min-Max Temperature Range Bar */}
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden mx-1.5 min-w-[70px]">
                <div
                  className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400 opacity-90 shadow-sm"
                  style={{
                    left: `${leftPercent}%`,
                    right: `${rightPercent}%`,
                  }}
                />
              </div>

              {/* Max Temp */}
              <span className="w-9 text-left text-xs font-semibold text-white shrink-0">
                {convertTemp(day.maxTemp)}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
