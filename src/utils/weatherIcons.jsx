import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, CloudDrizzle, Moon, CloudSun, CloudMoon } from 'lucide-react';

export const getWeatherIcon = (code, size = 64, className = "") => {
  const props = { size, className };
  switch (code) {
    case '01d': return <Sun {...props} color="#FBBF24" />;
    case '01n': return <Moon {...props} color="#93C5FD" />;
    case '02d': return <CloudSun {...props} color="#FCD34D" />;
    case '02n': return <CloudMoon {...props} color="#93C5FD" />;
    case '03d':
    case '03n':
    case '04d':
    case '04n': return <Cloud {...props} color="#E2E8F0" />;
    case '09d':
    case '09n': return <CloudDrizzle {...props} color="#60A5FA" />;
    case '10d':
    case '10n': return <CloudRain {...props} color="#3B82F6" />;
    case '11d':
    case '11n': return <CloudLightning {...props} color="#F59E0B" />;
    case '13d':
    case '13n': return <Snowflake {...props} color="#FFFFFF" />;
    case '50d':
    case '50n': return <CloudFog {...props} color="#CBD5E1" />;
    default: return <Cloud {...props} color="#ffffff" />;
  }
};

