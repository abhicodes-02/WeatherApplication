import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function SearchBar({ onSearch, onLocation }) {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="flex gap-3 w-full">
      <form onSubmit={handleSearch} className="flex-1 relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search location..."
          className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-white placeholder-white/50 outline-none transition-all focus:ring-2 focus:ring-white/20 shadow-lg backdrop-blur-md"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
          <Search size={20} />
        </button>
      </form>
      <button
        onClick={onLocation}
        className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl aspect-square w-[58px] flex items-center justify-center text-white transition-all active:scale-95 shrink-0 shadow-lg backdrop-blur-md"
        title="Current Location"
      >
        <MapPin size={22} />
      </button>
    </div>
  );
}
