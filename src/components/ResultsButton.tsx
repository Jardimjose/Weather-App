import React from "react";
import type { LocationResult } from "../services/geocoding";

interface ResultButtonProps {
  location: LocationResult;
  isSelected: boolean;
  onSelect: (location: LocationResult) => void;
}

const ResultButton: React.FC<ResultButtonProps> = ({
  location,
  isSelected,
  onSelect,
}) => {
  const locationSubtitle = [location.admin1, location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <button
      type="button"
      onClick={() => onSelect(location)}
      aria-pressed={isSelected}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
        isSelected
          ? "border-[#0284C7] dark:border-[#00B4D8] bg-sky-50/50 dark:bg-sky-950/20 shadow-sm ring-1 ring-[#0284C7] dark:ring-[#00B4D8]"
          : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0A0D14] hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {location.name}
        </h3>
        {locationSubtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {locationSubtitle}
          </p>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-center">
        {isSelected ? (
          <div className="w-5 h-5 rounded-full bg-[#0284C7] dark:bg-[#00B4D8] text-white flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700" />
        )}
      </div>
    </button>
  );
};

export default ResultButton;