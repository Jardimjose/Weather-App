import React from 'react';
import ForecastCard from './ForecastCard';

export interface DailyForecast {
  day: string;
  description: string;
  lowTemp: number;
  highTemp: number;
}

interface WeatherForecastProps {
  forecastData?: DailyForecast[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecastData = [
    { day: 'Mon, Oct 20', description: 'Drizzle', lowTemp: 12, highTemp: 17 },
    { day: 'Tue, Oct 21', description: 'Partly cloudy', lowTemp: 13, highTemp: 19 },
    { day: 'Wed, Oct 22', description: 'Rain', lowTemp: 11, highTemp: 16 },
  ],
}) => {
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

        {/* 3-Day Cards Grid (Side-by-side on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {forecastData.map((forecast, index) => (
            <ForecastCard
              key={index}
              day={forecast.day}
              description={forecast.description}
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