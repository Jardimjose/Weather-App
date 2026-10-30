import { useState, useEffect } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between px-6 py-4 text-slate-900 dark:text-white gap-4 sm:gap-0 transition-colors duration-300">
      {/* Left side: Logo & Title */}
      <a href="#" className="flex items-center gap-3">
        <img
          src="./src/assets/logo.svg"
          alt="City Weather logo"
          width="32"
          height="32"
          className="w-8 h-8 brightness-0 dark:brightness-100 transition-all" /* neex to fix the logo*/ 
        />
        <h1 className="text-lg font-semibold">City Weather</h1>
      </a>

      {/* Right side: Search text & Dark Mode Toggle Switch */}
      <div className="flex items-center gap-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Search a location
        </p>

        {/* Custom Toggle Switch Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none cursor-pointer"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
