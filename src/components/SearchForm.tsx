import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (cityName: string) => void;
  statusMessage?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, statusMessage }) => {
  const [inputCity, setInputCity] = useState("");

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (inputCity.trim()) {
      onSearch(inputCity.trim());
    }
  };

  return (
    <section
      aria-labelledby="search-heading"
      className="w-full h-full p-6 bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between shadow-sm transition-colors duration-300"
    >
      <div>
        {/* Section Heading */}
        <h2
          id="search-heading"
          className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1 font-serif"
        >
          Search for a city
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Enter a location, choose the correct one from the results to view the
          current weather and forecast.
        </p>

        {/* Semantic Form Element */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label
            htmlFor="city-input"
            className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase"
          >
            City Name
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="city-input"
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="e.g. San Francisco"
              required
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition-all text-sm"
            />

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0284C7] hover:bg-sky-600 dark:bg-[#00B4D8] dark:hover:bg-[#0096C7] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              {/* Decorative Icon hidden from screen readers */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Accessible Dynamic Status Message */}
      {statusMessage && (
        <div
          aria-live="polite"
          className="mt-6 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
        >
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{statusMessage}</span>
        </div>
      )}
    </section>
  );
};

export default SearchForm;
