"use strict";

const input = document.querySelector(".search");
const searchBtn = document.querySelector(".search-icon");
const getDeviceLocation = document.querySelector(".get-current-location");
const clearBtn = document.querySelector(".clear");
const quoteContainer = document.querySelector(".container");
const cardsContainer = document.querySelector(".weather-cards");
let temp = document.querySelector(".temp");
let description = document.querySelector(".description");
let humid = document.querySelector(".humid-temp");
let cityCountry = document.querySelector(".city-country");
let minMax = document.querySelector(".min-max-temp");
const weatherIcon = document.querySelector(".weather-icon");



clearBtn.addEventListener("click", function () {
  input.value = "";
  quoteContainer.classList.remove("hidden");
  cardsContainer.classList.add("hidden");
});



input.addEventListener("keyup", function (e) {
  const city = input.value;

  if (e.key == "Enter" && input.value != "") {
    getEnterWeather(city);
  }
});

const getEnterWeather = async function (city) {
  let apiKey = "bbf8d5e980c72026e64768d1c50ebe79";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const data = await fetch(api);

  let jsonData = await data.json();
  console.log(jsonData);
  weatherDetails(jsonData);

  quoteContainer.classList.add('hidden');
  cardsContainer.classList.remove('hidden');
};


getDeviceLocation.addEventListener("click", function (position) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"bbf8d5e980c72026e64768d1c50ebe79"}`;

      const getCurrentWeather = async function () {
        const data = await fetch(currentWeather);

        let jsonData = await data.json();
        console.log(jsonData);

        weatherDetails(jsonData);
      };
      getCurrentWeather();
    },
    () => {
      alert("Could not get you location");
    }
  );
});



async function weatherDetails(jsonData) {
  const city = await jsonData.name;
  const country = await jsonData.sys.country;
  const id = await jsonData.weather[0].id;
  
  temp.textContent = `${jsonData.main.temp}\u00B0 C`;
  description.textContent = jsonData.weather[0].description;
  humid.textContent = `${jsonData.main.humidity}%`;
  minMax.textContent = `${jsonData.main.temp_max} / ${jsonData.main.temp_min}`;
  cityCountry.textContent = `${city}, ${country}`;

  if (id === 800) {
    weatherIcon.src = "src/img/clear.png";
  }

  if (id >= 200 && id <= 232) {
    weatherIcon.src = "src/img/thunderstrom.png";
  }

  if (id >= 300 && id <= 321) {
    weatherIcon.src = "src/img/drizzle.png";
  }

  if (id >= 500 && id <= 531) {
    weatherIcon.src = "src/img/rain.png";
  }

  if (id >= 600 && id <= 622) {
    weatherIcon.src = "src/img/snow.png";
  }

  if (id >= 701 && id <= 781) {
    weatherIcon.src = "src/img/atmosphere.png";
  }

  if (id >= 801 && id <= 804) {
    weatherIcon.src = "src/img/cloud.png";
  }
  quoteContainer.classList.add('hidden');
  cardsContainer.classList.remove('hidden');
}

searchBtn.addEventListener("click", function () {
  const city = input.value;
  let apiKey = "bbf8d5e980c72026e64768d1c50ebe79";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const getWeather = async function () {
    const data = await fetch(api);

    let jsonData = await data.json();
    console.log(jsonData);

    weatherDetails(jsonData);
  };
  getWeather();
}) ;
