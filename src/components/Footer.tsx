const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between px-6 py-4 text-slate-500 dark:text-slate-400 text-sm gap-2 sm:gap-0 transition-colors duration-300">
      {/* Left side: Name & Copyright */}
      <p className="text-sm text-center sm:text-left">
        © 2026 Jose Jardim.
      </p>

      {/* Center: Open-Meteo attribution */}
      <p className="text-sm text-center">
        Weather data provided by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-100"
        >
          Open-Meteo
        </a>
      </p>

      {/* Right side: Links */}
      <div className="flex gap-4 text-sm">
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <a href="#" className="hover:underline">
          Terms
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;