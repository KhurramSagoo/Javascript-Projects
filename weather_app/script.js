const apiKey = "d608caefdc4fdddbdec602dc5addf830";
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const weatherInfo = document.getElementById("weather-info");

function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { name, main, weather, wind } = data;
      const temperature = main.temp;
      const feelsLike = main.feels_like;
      const description = weather[0].description;
      const img = weather[0].icon;
      const windSpeed = wind.speed;
      const windDeg = wind.deg;
      weatherInfo.innerHTML = `<h3>${name}</h3><p>Temperature: ${temperature.toFixed()}°C</p>
    <p>Feels Like:${feelsLike.toFixed()}</p>
      
      
      <p>${description}</p>
      <img src="http://openweathermap.org/img/wn/${img}@2x.png" />
      <p>Wind Speed: ${windSpeed} m/s</p><p>Wind Direction: ${windDeg}°</p>

      `;
      localStorage.setItem("weatherLocation", name);
      searchBox.value = "";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherInfo.innerHTML = `
      "<p>Failed to fetch weather data. Please try again. and ${error} </p>";
      `;
    });
}

const savedLocation = localStorage.getItem("weatherLocation");
if (savedLocation) {
  getWeatherData(savedLocation);
}

function handleSearch() {
  const location = searchBox.value;
  if (location) {
    getWeatherData(location);
  } else {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
  }
}

searchButton.addEventListener("click", handleSearch);

searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});
