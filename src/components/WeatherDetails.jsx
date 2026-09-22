import React from 'react';
import { Droplets, Wind, Thermometer, Eye } from 'lucide-react';

export default function WeatherDetails({ current }) {
  if (!current) return null;

  const details = [
    { label: 'Feels Like', value: `${Math.round(current.main.feels_like)}°`, icon: Thermometer },
    { label: 'Humidity', value: `${current.main.humidity}%`, icon: Droplets },
    { label: 'Wind', value: `${(current.wind.speed * 3.6).toFixed(1)} km/h`, icon: Wind },
    { label: 'Visibility', value: `${(current.visibility / 1000).toFixed(1)} km`, icon: Eye },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in">
      {details.map((detail, idx) => {
        const Icon = detail.icon;
        return (
          <div key={idx} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center gap-4 shadow-lg hover:bg-black/30 transition-colors">
            <div className="p-2 bg-white/5 rounded-full">
              <Icon size={22} className="text-white/80" />
            </div>
            <div>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-0.5">{detail.label}</p>
              <p className="text-white text-lg font-medium leading-none">{detail.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
