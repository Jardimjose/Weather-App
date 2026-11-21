export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string; // State or region (e.g. California)
  country_code?: string;
}

export async function getSearchResults(
  searchInput: string,
): Promise<LocationResult[] | null> {
  const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchInput)}&count=5&language=en&format=json`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result.results || [];
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
}
