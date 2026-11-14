import { useState, useEffect } from "react";
import { getSearchResults, type LocationResult } from "./services/geocoding";
import { getWeather, type CleanedWeatherData, formatDate, getWeatherDescription } from './services/weather';

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import RenderResults from "./components/RenderResults";
import Footer from "./components/Footer";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";


import "./App.css";

function App() {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);
  const [weatherData, setWeatherData] = useState<CleanedWeatherData | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch weather whenever selectedLocation changes
  useEffect(() => {
    async function fetchWeatherForLocation(loc: LocationResult) {
      const data = await getWeather(
        loc.latitude,
        loc.longitude,
        loc.name,
        loc.country || "",
      );
      if (data) {
        setWeatherData(data);
        const fullName = [loc.name, loc.admin1, loc.country]
          .filter(Boolean)
          .join(", ");
        setStatusMessage(`Loaded weather for ${fullName}.`);
      } else {
        setStatusMessage("Failed to load weather data.");
      }
    }

    if (selectedLocation) {
      fetchWeatherForLocation(selectedLocation);
    }
  }, [selectedLocation]);

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
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 pb-16 space-y-4">
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

          {/* Bottom Weather Cards Row (Side-by-side on desktop) */}
          {weatherData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5">
                <CurrentWeather
                  temperature={weatherData.currentTemp}
                  weatherDescription={getWeatherDescription(
                    weatherData.weatherCode,
                  )}
                  feelsLike={weatherData.feelsLike}
                  windSpeed={weatherData.wind}
                  windDirection="W" // Optional direction or map wind_direction_10m if added
                />
              </div>
              <div className="lg:col-span-7">
                <WeatherForecast
                  forecastData={weatherData.forecast.map((item) => ({
                    day: formatDate(item.date),
                    description: getWeatherDescription(item.weatherCode),
                    lowTemp: item.low,
                    highTemp: item.high,
                  }))}
                />
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
