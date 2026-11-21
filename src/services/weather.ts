export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  high: number;
  low: number;
}

export interface CleanedWeatherData {
  city: string;
  country: string;
  currentTemp: number;
  feelsLike: number;
  wind: number;
  weatherCode: number;
  forecast: DailyForecastItem[];
}

// Define the exact shape of the raw response from Open-Meteo
interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

function cleanData(
  data: OpenMeteoResponse,
  cityName: string,
  country: string,
): CleanedWeatherData {
  const { current, daily } = data;

  return {
    city: cityName,
    country: country || "",
    currentTemp: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    wind: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,

    forecast: daily.time
      .map((date: string, index: number) => ({
        date,
        weatherCode: daily.weather_code[index],
        high: Math.round(daily.temperature_2m_max[index]),
        low: Math.round(daily.temperature_2m_min[index]),
      }))
      .slice(0, 3),
  };
}

export async function getWeather(
  latitude: number,
  longitude: number,
  cityName: string,
  country: string,
): Promise<CleanedWeatherData | null> {
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result: OpenMeteoResponse = await response.json();
    return cleanData(result, cityName, country);
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getWeatherDescription(code: number): string {
  if (code === 0) return "Clear sky";

  if ([1, 2, 3].includes(code)) return "Partly cloudy";

  if ([45, 48].includes(code)) return "Fog";

  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";

  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";

  if ([71, 73, 75, 77].includes(code)) return "Snow";

  if ([80, 81, 82].includes(code)) return "Rain showers";

  if ([85, 86].includes(code)) return "Snow showers";

  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Unknown conditions";
}
