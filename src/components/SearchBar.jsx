import React, { useState } from 'react';
import { Search, Navigation } from 'lucide-react';

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
    <div className="w-full flex gap-2 mb-8">
      <form onSubmit={handleSearch} className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-black/20 hover:bg-black/30 focus:bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/50 outline-none transition-all shadow-lg"
        />
      </form>
      <button
        onClick={onLocation}
        title="Use Current Location"
        className="bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-white transition-all shadow-lg flex items-center justify-center active:scale-95"
      >
        <Navigation size={20} className="text-white/90" />
      </button>
    </div>
  );
}
