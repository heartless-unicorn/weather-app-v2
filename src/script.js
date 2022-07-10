//getting current position function
function retrievePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "4bef2345e330426bc02f380640dec5ea";
  weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherURL).then(currentCityWeather);
}
let apiLink;
//currentcity function
function currentCityWeather(responce) {
  let apiKey = "4bef2345e330426bc02f380640dec5ea";
  let latitude = responce.data.coord.lat;
  let longitude = responce.data.coord.lon;
  apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return days[day];
  }
  function Forecast(responce) {
    let forecast = document.querySelector("#forecast");
    let temp;

    let currentForecast = `<div class="row">`;
    let days = responce.data.daily;
    days.forEach(function (day) {
      let icon = day.weather[0].icon;
      temp = Math.round(day.feels_like.day);
      currentForecast =
        currentForecast +
        `<div class="col-3">
      <p class = "forecast-day">${formatDay(day.dt)}</p>
      <img src="http://openweathermap.org/img/wn/${icon}.png" class="forecast-weather-icon" id="icon"/>
       <span id="current-temp">${temp}</span>
            °C </div> `;
    });

    forecast.innerHTML = currentForecast;
  }
  axios.get(apiLink).then(Forecast);
  let city = responce.data.name;
  let celcius = responce.data.main.temp;
  currentTemp = Math.round(celcius);
  let currentHumidity = responce.data.main.humidity;
  let currentDescription = responce.data.weather[0].main;
  let currentIcon = responce.data.weather[0].icon;
  let currentWind = responce.data.wind.speed;

  let cityName = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let wind = document.querySelector("#wind");

  cityName.innerHTML = `${city}`;
  weather.innerHTML = `${currentTemp}`;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  description.innerHTML = `<b>${currentDescription}<b>`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentIcon}.png`
  );
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
  let cityWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityWeatherURL).then(currentCityWeather);
}

function changeToCurrent(event) {
  event.preventDefault();
  axios.get(weatherURL).then(currentCityWeather);
}

let weather = document.querySelector("#current-temp");
let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let current = document.querySelector("#current");
current.addEventListener("click", changeToCurrent);

let currentTemp = null;
let weatherURL = null;

navigator.geolocation.getCurrentPosition(retrievePosition);

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
