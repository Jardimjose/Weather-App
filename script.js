const searchForm = document.getElementById("city-search");
const searchResultSection = document.querySelector("search-results");
const displayForcastSection = document.querySelector("results-display");
const errorDisplaySection = document.querySelector("error-display");

function createResultCards(searchResults) {
  const list = document.createElement("ul");
  const listItem = document.createElement("li");
  const resultItemBtn = document.createElement("button");
  const resultTitle = document.createElement("span");
  const resultDescription = document.createElement("span");
}

async function getSearchResults(searchInput) {
  const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=5&language=en&format=json`; 

  const response = await fetch(URL);



  fetch(URL)
    .then((res) => res.json())
    .then((data) => console.log("weather data:", data));
}


getSearchResults("Malmö");