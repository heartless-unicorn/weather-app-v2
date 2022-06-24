//getting current position function
function retrievePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "4bef2345e330426bc02f380640dec5ea";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  //currentcity function
  function currentCityWeather(responce) {
    let city = responce.data.name;
    let cityName = document.querySelector("#city");
    cityName.innerHTML = `${city}`;

    let currentTemp = Math.round(responce.data.main.temp);
    let weather = document.querySelector("#current-temp");
    weather.innerHTML = `${currentTemp}`;
    let currentHumidity = responce.data.main.humidity;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${currentHumidity}%`;
    let currentDescription = responce.data.weather[0].main;
    let description = document.querySelector("#description");
    description.innerHTML = `<b>${currentDescription}<b>`;
    let currentIcon = responce.data.weather[0].icon;
    console.log(currentIcon);
    let icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${currentIcon}.png`
    );

    let country = responce.data.sys.country;

    //current Country function
    function currentCountry(responce) {
      let fullCountryName = responce.data[0].name.common;
      let countryName = document.querySelector("#country");
      countryName.innerHTML = `${fullCountryName}`;
    }

    let countryURL = `https://restcountries.com/v3.1/alpha/${country}`;
    axios.get(countryURL).then(currentCountry);
  }
  axios.get(weatherURL).then(currentCityWeather);
  //current weather
}

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

//getting current position
navigator.geolocation.getCurrentPosition(retrievePosition);
//let currentWeather = document.querySelector("#current");
//currentWeather.addEventListener("click", retrievecurrentWeather);
