// form element
const searchForm = document.getElementById("search-form");
// input element
const searchInput = document.getElementById("city-search");
// section element for results, forecast and error messages.
const resultSection = document.querySelector(".search-results");
const validationDisplay = document.getElementById("validation-message");

const displayForcastSection = document.querySelector(".results-display");
const errorDisplaySection = document.querySelector(".error-display");

/**
 * fetches a list of cities based on the location given by the users
 * returns a list of locations or an empty list if there was an issue.
 */
async function getSearchResults(searchInput) {
  const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=5&language=en&format=json`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

/**
 * Takes the weather object response and builds a new cleaner object
 * then returns the cleaner data as a object
 */
function cleanData(data, cityName, country) {
  const { current, daily } = data;

  return {
    city: cityName,
    country: country,
    currentTemp: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    wind: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,

    forecast: daily.time.map((date, index) => ({
      date: date,
      weatherCode: daily.weather_code[index],
      high: Math.round(daily.temperature_2m_max[index]),
      low: Math.round(daily.temperature_2m_min[index]),
    })).slice(0, 3),
  };
}

/**
 * Fetches the actual weather forecast for a selected location.
 * and returns it in a cleaner format.
 */
async function getWeather(latitude, longitude, cityName, country) {
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return cleanData(result, cityName, country);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

/**
 * Takes a weather code and then
 * returns a readable string equivilant
 */
function getWeatherDescription(code) {
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

/**
 * Takes a date string and then reformats it
 * returns a new date string showing the weekday, month and day in short "Mon Nov 14"
 */
function formatDay(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * creates a "card" that will display the weather relevant for the current day
 * returns a section parent HTML element "card" with childern
 */
function createCurrentWeatherCard(weather) {
  const card = document.createElement("section");
  card.classList.add("card", "current-weather");
  card.setAttribute("aria-labelledby", "current-title");

  // card heading
  const header = document.createElement("header");
  header.classList.add("card-header");

  const heading = document.createElement("h3");
  heading.id = "current-title";
  heading.textContent = "Current weather";

  header.append(heading);

  // temperature and condition
  const main = document.createElement("div");
  main.classList.add("current-main");

  const text = document.createElement("div");

  const temp = document.createElement("p");
  temp.classList.add("current-temp");
  temp.textContent = weather.currentTemp + "°C";

  const condition = document.createElement("p");
  condition.classList.add("current-condition");
  condition.textContent = getWeatherDescription(weather.weatherCode);

  text.append(temp, condition);
  main.append(text); // add the icon here later

  // feels like and wind speed
  const stats = document.createElement("dl");
  stats.classList.add("stats");

  const statData = [
    { label: "Feels like", value: weather.feelsLike + "°C" },
    { label: "Wind speed", value: weather.wind + " km/h" },
  ];

  statData.forEach((item) => {
    const stat = document.createElement("div");
    stat.classList.add("stat");

    const term = document.createElement("dt");
    term.textContent = item.label;

    const value = document.createElement("dd");
    value.textContent = item.value;

    stat.append(term, value);
    stats.append(stat);
  });

  card.append(header, main, stats);
  return card;
}

/**
 * creates a "card" that will display the weather forecast several days
 * returns a section parent element "card" with children appened to it.
 */
function createForecastCards(weather) {
  const card = document.createElement("section");
  card.classList.add("card", "forecast");
  card.setAttribute("aria-labelledby", "forecast-title");

  // card heading
  const header = document.createElement("header");
  header.classList.add("card-header");

  const heading = document.createElement("h3");
  heading.id = "forecast-title";
  heading.textContent = "Three-day forecast";

  header.append(heading);

  // one li per day
  const list = document.createElement("ul");
  list.classList.add("forecast-list");

  weather.forecast.forEach((day) => {
    const item = document.createElement("li");
    item.classList.add("forecast-day");

    const time = document.createElement("time");
    time.dateTime = day.date;
    time.textContent = formatDay(day.date);

    const condition = document.createElement("p");
    condition.classList.add("forecast-condition");
    condition.textContent = getWeatherDescription(day.weatherCode);

    const range = document.createElement("p");
    range.classList.add("forecast-range");

    const high = document.createElement("strong");
    high.textContent = "High " + day.high + "°C";

    range.append("Low " + day.low + "°C · ", high);

    item.append(time, condition, range); // add the icon between time and condition later
    list.append(item);
  });

  card.append(header, list);
  return card;
}

function renderForecastResults(weather) {
  displayForcastSection.innerHTML = "";

  const header = document.createElement("header");
  header.classList.add("weather-header");

  const title = document.createElement("h2");
  title.textContent = "Weather";

  const selectedPlace = document.createElement("p");
  selectedPlace.classList.add("weather-location");
  selectedPlace.textContent = [weather.city, weather.country].join(", ");

  header.append(title, selectedPlace);

  displayForcastSection.append(
    header,
    createCurrentWeatherCard(weather),
    createForecastCards(weather),
  );
  displayForcastSection.classList.remove("hidden");
}
// creates a list of results found when searching
function createResultCards(searchResults, onSelect) {
  const list = document.createElement("ul");
  list.classList.add("location-list");

  // Loop through each found place and adds them to the ul
  searchResults.forEach((place) => {
    // 1 li per found place
    const listItem = document.createElement("li");

    // create the btn, set the type, add the class for styling and set aria press state
    const resultItemBtn = document.createElement("button");
    resultItemBtn.type = "button";
    resultItemBtn.classList.add("location-card");
    resultItemBtn.setAttribute("aria-pressed", "false");

    const resultTitle = document.createElement("span");
    resultTitle.classList.add("location-name");
    resultTitle.textContent = place.name;

    const resultDescription = document.createElement("span");
    resultDescription.classList.add("location-region");
    resultDescription.textContent = [place.admin1, place.country]
      .filter(Boolean)
      .join(", ");

    // adds an event listener to each button being made for the found results
    resultItemBtn.addEventListener("click", () => {
      list.querySelectorAll(".location-card").forEach((btn) => {
        btn.classList.remove("is-selected");
        btn.setAttribute("aria-pressed", "false");
      });

      resultItemBtn.classList.add("is-selected");
      resultItemBtn.setAttribute("aria-pressed", "true");

      // show which weather is being selected
      validationDisplay.innerHTML = `Loaded weather for ${[
        place.name,
        place.admin1,
        place.country,
      ].join(", ")}.`;

      onSelect(place);
    });

    resultItemBtn.append(resultTitle, resultDescription);
    listItem.append(resultItemBtn);
    list.append(listItem);
  });

  return list;
}

function renderSearchResults(places) {
  resultSection.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Choose a location";

  const count = document.createElement("p");
  count.classList.add("results-count");
  count.textContent = places.length + " results";

  const header = document.createElement("div");
  header.classList.add("results-header");
  header.append(heading, count);

  // Takes the places found and a callback that is called when a select place is chosen.
  const list = createResultCards(places, async function (place) {
    const weather = await getWeather(
      place.latitude,
      place.longitude,
      place.name,
      place.country,
    );
    renderForecastResults(weather);
    //console.log(weather);
  });

  resultSection.append(header, list);
  resultSection.classList.remove("hidden");
}



searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  //reset some elements on submit
  validationDisplay.innerHTML = "";
  displayForcastSection.innerHTML = "";

  const input = searchInput.value.trim();

  const results = await getSearchResults(input);

  // checks that input is not empty.
  if (!input) {
    validationDisplay.innerText = "Please enter a location to search.";
    validationDisplay.classList.add("error-text");
    resultSection.classList.add("hidden");
    return;
  }

  // if results found, show success message.
  if (results) {
    validationDisplay.innerHTML = `Found ${results.length} locations for ${input.charAt(0).toUpperCase() + input.slice(1)}. Please select one to view its forecast`;
    validationDisplay.classList.add("success-text");
  }

  renderSearchResults(results);
  console.log(results);

  // test request to berlin
  // console.log(await getWeather(52.52437, 13.41053, "Berlin", "Germany"));

  searchForm.reset();
});
