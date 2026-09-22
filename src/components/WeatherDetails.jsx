import React from 'react';
import { Droplets, Wind, Thermometer, Eye, Gauge, Cloud } from 'lucide-react';

export default function WeatherDetails({ current }) {
  if (!current) return null;

  const details = [
    { label: 'Feels Like', value: `${Math.round(current.main.feels_like)}°`, icon: Thermometer, desc: 'Perceived temp' },
    { label: 'Humidity', value: `${current.main.humidity}%`, icon: Droplets, desc: 'Moisture in air' },
    { label: 'Wind Speed', value: `${(current.wind.speed * 3.6).toFixed(1)} km/h`, icon: Wind, desc: 'Direction: ' + current.wind.deg + '°' },
    { label: 'Visibility', value: `${(current.visibility / 1000).toFixed(1)} km`, icon: Eye, desc: 'Clear view distance' },
    { label: 'Pressure', value: `${current.main.pressure} hPa`, icon: Gauge, desc: 'Atmospheric pressure' },
    { label: 'Cloudiness', value: `${current.clouds.all}%`, icon: Cloud, desc: 'Sky coverage' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 h-full">
      {details.map((detail, idx) => {
        const Icon = detail.icon;
        return (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-5 lg:p-6 flex flex-col justify-between hover:bg-white/10 transition-colors backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Icon size={20} className="text-white/60" />
              <h4 className="text-white/60 text-sm font-semibold uppercase tracking-wider">{detail.label}</h4>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white mb-1">{detail.value}</p>
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{detail.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
