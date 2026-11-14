import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

interface ForecastCardProps {
  day: string;
  description: string;
  weatherCode: number;
  lowTemp: number;
  highTemp: number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  day,
  description,
  weatherCode,
  lowTemp,
  highTemp,
}) => {
  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-44">
      <div>
        <div className="flex items-start justify-between">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {day}
          </span>
          {/* Dynamic Condition Icon */}
          <div className="text-[#0284C7] dark:text-[#00B4D8]">
            {getWeatherIcon(weatherCode, "w-5 h-5")}
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>

      {/* High/Low Temperature Footer Tag */}
      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-center">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Low {lowTemp}°C <span className="text-slate-400 mx-0.5">•</span> High {highTemp}°C
        </span>
      </div>
    </div>
  );
};

export default ForecastCard;