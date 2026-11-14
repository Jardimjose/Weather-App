import React from 'react';

interface CurrentWeatherProps {
  temperature?: number;
  weatherDescription?: string;
  feelsLike?: number;
  windSpeed?: number;
  windDirection?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature = 18,
  weatherDescription = 'Partly cloudy',
  feelsLike = 16,
  windSpeed = 22,
  windDirection = 'WNW',
}) => {
  return (
    <section
      aria-labelledby="current-weather-heading"
      className="w-full h-full p-6 bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between shadow-sm transition-colors duration-300"
    >
      <div>
        <h2
          id="current-weather-heading"
          className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-6"
        >
          Current weather
        </h2>

        {/* Temperature & Weather Icon Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-6xl sm:text-7xl font-light tracking-tight text-slate-900 dark:text-slate-100">
              {temperature}°C
            </div>
            <p className="text-xl text-[#0284C7] dark:text-[#00B4D8] font-medium mt-2">
              {weatherDescription}
            </p>
          </div>

          {/* Weather Condition Icon Container */}
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0284C7] dark:text-[#00B4D8]">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sub-cards Grid (Feels Like & Wind Speed) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Feels like
          </span>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-1">
            {feelsLike}°C
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Wind speed
          </span>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-1 flex items-baseline gap-1.5">
            {windSpeed} <span className="text-xs font-normal text-slate-500">km/h</span>{' '}
            {/*<span className="text-xs text-[#0284C7] dark:text-[#00B4D8] font-medium">{windDirection}</span> */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;