import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

export default function SearchBar({ onSearch, onLocation, unit = 'C', onToggleUnit }) {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="flex items-center gap-2.5 w-full">
      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="flex-1 relative group">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city, state or country..."
          className="w-full bg-slate-900/60 hover:bg-slate-900/80 focus:bg-slate-900/90 border border-white/10 focus:border-sky-400/40 rounded-2xl py-3.5 pl-11 pr-10 text-sm text-white placeholder-white/40 outline-none transition-all focus:ring-2 focus:ring-sky-500/20 shadow-lg backdrop-blur-2xl"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-sky-400 transition-colors pointer-events-none">
          <Search size={17} />
        </div>

        {city && (
          <button
            type="button"
            onClick={() => setCity('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {/* Geolocation Button */}
      <button
        onClick={onLocation}
        className="bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-white/20 rounded-2xl aspect-square w-[48px] h-[48px] flex items-center justify-center text-white/70 hover:text-sky-400 transition-all active:scale-95 shrink-0 shadow-lg backdrop-blur-2xl"
        title="Use Current GPS Location"
        aria-label="Use Current Location"
      >
        <MapPin size={19} />
      </button>

      {/* Unit Toggle (°C / °F) */}
      <button
        onClick={onToggleUnit}
        className="bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-sky-400/30 rounded-2xl px-3.5 h-[48px] flex items-center justify-center font-bold text-xs tracking-wider transition-all active:scale-95 shrink-0 shadow-lg backdrop-blur-2xl text-white"
        title="Toggle Temperature Unit (°C / °F)"
      >
        <span className={unit === 'C' ? 'text-sky-400 font-extrabold' : 'text-white/40'}>°C</span>
        <span className="text-white/20 mx-1">/</span>
        <span className={unit === 'F' ? 'text-sky-400 font-extrabold' : 'text-white/40'}>°F</span>
      </button>
    </div>
  );
}
