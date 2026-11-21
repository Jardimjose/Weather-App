import React from 'react';
import type { LocationResult } from '../services/geocoding';
import ResultButton from './ResultsButton';

interface ResultDisplayProps {
  results: LocationResult[];
  selectedLocation: LocationResult | null;
  onSelectLocation: (location: LocationResult) => void;
  isLoading?: boolean;
}

const RenderResults: React.FC<ResultDisplayProps> = ({
  results,
  selectedLocation,
  onSelectLocation,
  isLoading = false,
}) => {
  return (
    <section
      aria-labelledby="results-heading"
      className="w-full h-full p-6 bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between shadow-sm transition-colors duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2
            id="results-heading"
            className="text-xl font-semibold text-slate-900 dark:text-slate-100 font-serif"
          >
            Choose a location
          </h2>
          {results.length > 0 && (
            <span className="px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-full">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Searching locations...
          </div>
        ) : results.length > 0 ? (
          /* Stacks vertically on mobile (grid-cols-1), side-by-side on desktop (md:grid-cols-2) */
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((location) => (
              <li key={location.id} className="w-full">
                <ResultButton
                  location={location}
                  isSelected={selectedLocation?.id === location.id}
                  onSelect={onSelectLocation}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No locations to select yet. Search for a city above.
          </div>
        )}
      </div>
    </section>
  );
};

export default RenderResults;