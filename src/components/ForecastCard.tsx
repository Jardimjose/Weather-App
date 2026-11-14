import React from 'react';

interface ForecastCardProps {
  day: string;
  description: string;
  lowTemp: number;
  highTemp: number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  day,
  description,
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
          {/* Condition Icon */}
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 15a4 4 0 004 4h10a4 4 0 003.8-5.2M15 11l-3-3m0 0l-3 3m3-3v8"
            />
          </svg>
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