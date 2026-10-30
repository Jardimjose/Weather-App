import { useState } from "react";
import { getSearchResults, type LocationResult } from './services/geocoding';

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (cityName: string) => {
    setIsLoading(true);
    setStatusMessage('Searching...');

    const results = await getSearchResults(cityName);

    setIsLoading(false);

    if (results === null) {
      setStatusMessage('Network error. Please try again.');
    } else if (results.length === 0) {
      setStatusMessage(`No locations found for "${cityName}".`);
      setLocations([]);
    } else {
      setLocations(results);
      setStatusMessage(`Found ${results.length} location(s) for "${cityName}".`);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header />
        <main className="flex-1 px-6 py-8">
          <SearchForm onSearch={handleSearch} statusMessage={statusMessage}/>

        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
