import { useState } from "react";
import { getSearchResults, type LocationResult } from "./services/geocoding";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import RenderResults from "./components/RenderResults";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (cityName: string) => {
    setIsLoading(true);
    setStatusMessage("Searching...");

    const results = await getSearchResults(cityName);
    setIsLoading(false);

    if (results === null) {
      setStatusMessage("Network error. Please try again.");
    } else if (results.length === 0) {
      setStatusMessage(`No locations found for "${cityName}".`);
      setLocations([]);
      setSelectedLocation(null);
    } else {
      setLocations(results);
      // Automatically select the first location result
      setSelectedLocation(results[0]);

      const first = results[0];
      const fullName = [first.name, first.admin1, first.country]
        .filter(Boolean)
        .join(", ");
      setStatusMessage(`Loaded weather for ${fullName}.`);
    }
  };

  const handleSelectLocation = (location: LocationResult) => {
    setSelectedLocation(location);
    const fullName = [location.name, location.admin1, location.country]
      .filter(Boolean)
      .join(", ");
    setStatusMessage(`Loaded weather for ${fullName}.`);
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto space-y-6">
          {/* Top Row: Search Form (Left) & Location Results (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <SearchForm onSearch={handleSearch} statusMessage={statusMessage} />
            <RenderResults
              results={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              isLoading={isLoading}
            />
          </div>

          {/* Weather Header Section */}
          {selectedLocation && (
            <div className="mt-8">
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
                Weather
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {[
                  selectedLocation.name,
                  selectedLocation.admin1,
                  selectedLocation.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Bottom Row: Current Weather (Left) & Weather Forecast (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5">{/* <CurrentWeather /> */}</div>
            <div className="lg:col-span-7">{/* <WeatherForecast /> */}</div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
