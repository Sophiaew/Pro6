// Date

let now = new Date();

let hour = now.getHours();
let minute = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let time = document.querySelector("#current-date");
time.innerHTML = `${day} ${hour}:${minute}`;

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
}
//City position
function showLocation(position) {
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
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
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
