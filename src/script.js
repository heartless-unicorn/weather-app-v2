//getting current position function
function retrievePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "4bef2345e330426bc02f380640dec5ea";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherURL).then(currentCityWeather);
}
let weather = document.querySelector("#current-temp");
//currentcity function
function currentCityWeather(responce) {
  let city = responce.data.name;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${city}`;
  //current weather
  celcius = responce.data.main.temp;
  currentTemp = Math.round(celcius);

  weather.innerHTML = `${currentTemp}`;
  let currentHumidity = responce.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  let currentDescription = responce.data.weather[0].main;
  let description = document.querySelector("#description");
  description.innerHTML = `<b>${currentDescription}<b>`;
  let currentIcon = responce.data.weather[0].icon;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentIcon}.png`
  );
  let currentWind = responce.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${currentWind} km/h`;
  //current Country function
  function currentCountry(responce) {
    let fullCountryName = responce.data[0].name.common;
    let countryName = document.querySelector("#country");
    countryName.innerHTML = `${fullCountryName}`;
  }
  let country = responce.data.sys.country;
  let countryURL = `https://restcountries.com/v3.1/alpha/${country}`;
  axios.get(countryURL).then(currentCountry);
}

//change the city
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let city = cityInput.value;
  search(city);
}
function search(city) {
  let apiKey = "4bef2345e330426bc02f380640dec5ea";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherURL).then(currentCityWeather);
}
function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitConvert = currentTemp * (9 / 5) + 32;
  weather.innerHTML = `${Math.round(fahrenheitConvert)}`;
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");

fahrenheit.addEventListener("click", changeToFahrenheit);
navigator.geolocation.getCurrentPosition(retrievePosition);

let currentTemp = null;

// Current date
let date = new Date();
let time = document.querySelector("#time");
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = date.getHours();
let minutes = date.getMinutes();
let day = weekday[date.getDay()];
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hour}:${minutes}, ${day}`;
