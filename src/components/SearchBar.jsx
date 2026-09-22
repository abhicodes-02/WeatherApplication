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
    <div className="w-full flex flex-col items-center gap-3 mb-6">
      <form onSubmit={handleSearch} className="flex w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          spellCheck="false"
          className="flex-grow px-4 py-3 rounded-l-xl bg-white/20 backdrop-blur-sm outline-none text-white placeholder-gray-200 transition focus:bg-white/30"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 transition px-4 rounded-r-xl text-gray-900 flex items-center justify-center"
        >
          <Search size={22} />
        </button>
      </form>
      
      <button
        onClick={onLocation}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-transform px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
      >
        <MapPin size={18} />
        Get Current Location
      </button>
    </div>
  );
}

