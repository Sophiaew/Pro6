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
function showTemp(response) {
  let temp = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  let currentTemp = Math.round(response.data.main.temp);
  let currentWeather = response.data.weather[0].description;
  temp.innerHTML = `${currentTemp}°`;
  weatherDescription.innerHTML = `${currentWeather}`;
}

function showLocation(position) {
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let lat = Math.round(position.coords.latitude);
  let apiKey = `17bcfd67e085423bef87d025a6a15b1b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTempCoords);
}

function showTempCoords(response) {
  let tempElement = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  let currentWeather = response.data.weather[0].description;
  let temp = Math.round(response.data.main.temp);
  let city = document.querySelector("#current-city");
  city.innerHTML = `Current Location`;
  tempElement.innerHTML = `${temp}°`;
  weatherDescription.innerHTML = `${currentWeather}`;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

/*function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = `66°`;
}

function celsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = `19°`;
}

let far = document.querySelector("#fahrenheit-link");
let cel = document.querySelector("#celsius-link");
far.addEventListener("click", fahrenheit);
cel.addEventListener("click", celsius);*/
