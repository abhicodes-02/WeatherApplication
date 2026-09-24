// Maps OpenWeatherMap weather conditions & time of day to rich atmospheric gradient themes
export const getWeatherTheme = (iconCode = '01d') => {
  const isNight = iconCode.endsWith('n');
  const code = iconCode.slice(0, 2);

  // Clear Sky
  if (code === '01') {
    if (isNight) {
      return {
        id: 'clear-night',
        background: 'from-slate-950 via-indigo-950 to-slate-900',
        ambientGlow: 'bg-indigo-600/15',
        accent: '#818cf8',
        cardBg: 'bg-slate-900/40 border-indigo-500/10',
        heroTag: 'Clear Night Sky',
      };
    }
    return {
      id: 'clear-day',
      background: 'from-sky-950 via-slate-900 to-amber-950/40',
      ambientGlow: 'bg-amber-500/15',
      accent: '#f59e0b',
      cardBg: 'bg-slate-900/40 border-amber-500/10',
      heroTag: 'Sunny & Clear',
    };
  }

  // Few / Scattered Clouds
  if (code === '02' || code === '03') {
    if (isNight) {
      return {
        id: 'clouds-night',
        background: 'from-slate-950 via-slate-900 to-blue-950',
        ambientGlow: 'bg-blue-600/10',
        accent: '#60a5fa',
        cardBg: 'bg-slate-900/40 border-white/5',
        heroTag: 'Partly Cloudy Night',
      };
    }
    return {
      id: 'clouds-day',
      background: 'from-slate-950 via-slate-900 to-sky-950',
      ambientGlow: 'bg-sky-500/15',
      accent: '#38bdf8',
      cardBg: 'bg-slate-900/40 border-white/5',
      heroTag: 'Partly Cloudy',
    };
  }

  // Broken / Overcast Clouds
  if (code === '04') {
    return {
      id: 'overcast',
      background: 'from-zinc-950 via-slate-900 to-stone-900',
      ambientGlow: 'bg-slate-500/15',
      accent: '#94a3b8',
      cardBg: 'bg-slate-900/40 border-white/5',
      heroTag: 'Overcast Skies',
    };
  }

  // Rain / Shower Rain
  if (code === '09' || code === '10') {
    return {
      id: 'rain',
      background: 'from-slate-950 via-cyan-950/60 to-slate-900',
      ambientGlow: 'bg-cyan-500/15',
      accent: '#06b6d4',
      cardBg: 'bg-slate-900/40 border-cyan-500/10',
      heroTag: 'Rainy Atmosphere',
    };
  }

  // Thunderstorm
  if (code === '11') {
    return {
      id: 'thunderstorm',
      background: 'from-slate-950 via-purple-950/60 to-zinc-950',
      ambientGlow: 'bg-purple-600/20',
      accent: '#c084fc',
      cardBg: 'bg-slate-900/40 border-purple-500/15',
      heroTag: 'Thunderstorm Active',
    };
  }

  // Snow
  if (code === '13') {
    return {
      id: 'snow',
      background: 'from-slate-950 via-blue-950/50 to-slate-900',
      ambientGlow: 'bg-blue-300/15',
      accent: '#93c5fd',
      cardBg: 'bg-slate-900/40 border-blue-300/10',
      heroTag: 'Snowy Conditions',
    };
  }

  // Mist / Fog / Haze
  if (code === '50') {
    return {
      id: 'mist',
      background: 'from-stone-950 via-slate-900 to-zinc-900',
      ambientGlow: 'bg-teal-500/10',
      accent: '#2dd4bf',
      cardBg: 'bg-slate-900/40 border-white/5',
      heroTag: 'Misty / Foggy',
    };
  }

  // Fallback default
  return {
    id: 'default',
    background: 'from-slate-950 via-slate-900 to-indigo-950',
    ambientGlow: 'bg-sky-500/10',
    accent: '#38bdf8',
    cardBg: 'bg-slate-900/40 border-white/5',
    heroTag: 'Weather Intelligence',
  };
};
