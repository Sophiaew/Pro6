// Date

let now = new Date();

let hour = now.getHours();
let minute = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let time = document.querySelector("#current-date");
time.innerHTML = `${day} ${hour}:${minute}`;

//forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2 bottom-border">
    <h2>${formatDay(forecastDay.dt)}</h2>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="sunny">
    <div class="weather-forecast-temperatures">
      <p>
        <span class="weather-forecast-temperature-max">
          ${Math.round(forecastDay.temp.max)}° 
        </span>
        <span class="weather-forecast-temperature-min">
          ${Math.round(forecastDay.temp.min)}°
        </span>
      </p>
    </div>
  </div>
  `;
    }
  });

  forecastHTM = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `17bcfd67e085423bef87d025a6a15b1b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//City

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box");
  let city = document.querySelector("#current-city");
  let cityName = searchInput.value;
  let apiKey = `17bcfd67e085423bef87d025a6a15b1b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
  if (searchInput.value) {
    city.innerHTML = cityName;
  } else {
    city.innerHTML = null;
    alert("Please search for a city");
  }
}
//City weather
function showTemp(response) {
  console.log(response.data);
  let temp = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  let currentTemp = Math.round(response.data.main.temp);
  let currentWeather = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  temp.innerHTML = `${currentTemp}°`;
  weatherDescription.innerHTML = `${currentWeather}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}
//City position
function showLocation(position) {
  let lon = Math.round(position.coords.longitude);
  let lat = Math.round(position.coords.latitude);
  let apiKey = `17bcfd67e085423bef87d025a6a15b1b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let city = document.querySelector("#current-city");
  city.innerHTML = `Current Location`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//forecast
