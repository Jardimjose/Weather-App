// form element
const searchForm = document.getElementById("search-form");
// input element
const searchInput = document.getElementById("city-search");
// section element for results, forecast and error messages.
const resultSection = document.querySelector(".search-results");
const displayForcastSection = document.querySelector(".results-display");
const errorDisplaySection = document.querySelector(".error-display");

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

      onSelect(place);
    });

    resultItemBtn.append(resultTitle, resultDescription);
    listItem.append(resultItemBtn);
    list.append(listItem);
  });

  return list;
}

function renderResults(places) {
  resultSection.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Choose a location";

  const count = document.createElement("p");
  count.classList.add("results-count");
  count.textContent = places.length + " results";

  const header = document.createElement("div");
  header.classList.add("results-header");
  header.append(heading, count);

  const list = createResultCards(places, function (place) {
    // fetch the weather for X location when the uses click the button.
    //getWeather(place.latitude, place.longitude, place.name);
  });

  resultSection.append(header, list);
  resultSection.classList.remove("hidden");
}

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

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = searchInput.value.trim();

  // checks that input is not empty.
  if (!input) {
    console.log("search cant be empty");
  }

  const results = await getSearchResults(input);

  renderResults(results);
  console.log(results);

  searchForm.reset();
});
