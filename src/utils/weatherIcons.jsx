import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, CloudDrizzle, Moon } from 'lucide-react';

export const getWeatherIcon = (code, size = 64, className = "") => {
  const props = { size, className };
  switch (code) {
    case '01d': return <Sun {...props} color="#FFD700" />;
    case '01n': return <Moon {...props} color="#C0C0C0" />;
    case '02d': 
    case '02n': return <Cloud {...props} color="#A9A9A9" />;
    case '03d':
    case '03n':
    case '04d':
    case '04n': return <Cloud {...props} color="#808080" />;
    case '09d':
    case '09n': return <CloudDrizzle {...props} color="#ADD8E6" />;
    case '10d':
    case '10n': return <CloudRain {...props} color="#4682B4" />;
    case '11d':
    case '11n': return <CloudLightning {...props} color="#FFA500" />;
    case '13d':
    case '13n': return <Snowflake {...props} color="#FFFFFF" />;
    case '50d':
    case '50n': return <CloudFog {...props} color="#D3D3D3" />;
    default: return <Cloud {...props} color="#ffffff" />;
  }
};

