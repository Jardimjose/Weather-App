import React from 'react';
import ForecastCard from './ForecastCard';

export interface DailyForecastInput {
  day: string;
  description: string;
  weatherCode: number;
  lowTemp: number;
  highTemp: number;
}

interface WeatherForecastProps {
  forecastData?: DailyForecastInput[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData = [] }) => {
  return (
    <section
      aria-labelledby="forecast-heading"
      className="w-full h-full p-6 bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between shadow-sm transition-colors duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2
            id="forecast-heading"
            className="text-lg font-medium text-slate-700 dark:text-slate-300"
          >
            Three-day forecast
          </h2>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Daily overview
          </span>
        </div>

        {/* 3-Day Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {forecastData.map((forecast, index) => (
            <ForecastCard
              key={index}
              day={forecast.day}
              description={forecast.description}
              weatherCode={forecast.weatherCode}
              lowTemp={forecast.lowTemp}
              highTemp={forecast.highTemp}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherForecast;