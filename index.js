let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let citiesHTML = document.querySelector("li");
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
var tempUnit = "C";
let tempCurrent = document.querySelector(".today-weather-numbers");
let weatherCurrent = document.querySelector(".weather");
let tempUnitsC = document.querySelector(".sup-dark");
let tempUnitsF = document.querySelector(".sup-lite");
let humidity = document.querySelector("#humidity-value");
let wind = document.querySelector("#wind-value");
let apiKey = "6e6ec494746b5229a9f2d526478c924c";
let inputCity = document.querySelector("#search-form");

function showData(event) {
  event.preventDefault();
  let now = new Date();
  let dayNumber = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  let dayWeek = days[dayNumber];
  let time = `${hours}:${minutes}`;

  let inputCity = document.querySelector("#search-form");
  let cityIn = inputCity.value;
  cityIn = cityIn.toLowerCase().trim();

  function showWeather(response) {
    let tempOut = response.data.main.temp;
    tempOut = Math.round(tempOut);
    let humidityOut = response.data.main.humidity;
    let windOut = response.data.wind.speed;
    let weatherOut = response.data.weather[0].main;
    let cityOut = response.data.name;
    h1.innerHTML = `${cityOut}, ${time}`;
    tempCurrent.innerHTML = tempOut;
    humidity.innerHTML = `${humidityOut}  %`;
    wind.innerHTML = `${windOut} m/s`;
    weatherCurrent.innerHTML = weatherOut;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showData);

function showDataCurrent(event) {
  event.preventDefault();
  let now = new Date();
  let dayNumber = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  let dayWeek = days[dayNumber];
  let time = `${hours}:${minutes}`;

  function showData(position) {
    function showWeather(response) {
      let tempOut = response.data.main.temp;
      tempOut = Math.round(tempOut);
      let humidityOut = response.data.main.humidity;
      let windOut = response.data.wind.speed;
      let weatherOut = response.data.weather[0].main;
      let cityOut = response.data.name;
      h1.innerHTML = `${cityOut}, ${time}`;
      tempCurrent.innerHTML = tempOut;
      humidity.innerHTML = `${humidityOut}  %`;
      wind.innerHTML = `${windOut} m/s`;
      weatherCurrent.innerHTML = weatherOut;
    }
    let Lat = position.coords.latitude;
    let Long = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(showData);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showDataCurrent);
