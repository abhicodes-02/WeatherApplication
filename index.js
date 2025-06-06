const apiKey = "6af0bf46a6a3cc2582107eef6df3f951";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchButton = document.getElementById('search-button');
const getLocationButton = document.getElementById('get-location-button');
const cityInput = document.getElementById('city-input');
const errorText = document.getElementById('error-text');
const weatherDiv = document.getElementById('weather');

const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const weatherIconEl = document.getElementById('weather-icon');

// Hide weather block initially
weatherDiv.style.display = 'none';

// Search button click
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === "") {
    displayError("Please enter a city name");
  } else {
    fetchWeatherByCity(city);
  }
});

// Get current location
getLocationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        displayError("Unable to retrieve your location.");
      }
    );
  } else {
    displayError("Geolocation is not supported by this browser.");
  }
});

// Fetch by city
async function fetchWeatherByCity(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod !== 200) {
      displayError(data.message || "City not found");
      weatherDiv.style.display = 'none';
    } else {
      displayWeather(data);
    }
  } catch (error) {
    displayError("An error occurred. Please try again.");
  }
}

// Fetch by coordinates
async function fetchWeatherByLocation(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      displayError(data.message || "Location not found");
      weatherDiv.style.display = 'none';
    } else {
      displayWeather(data);
    }
  } catch (error) {
    displayError("An error occurred. Please try again.");
  }
}

// Display data
function displayWeather(data) {
  errorText.textContent = "";

  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;

  const windSpeed = (data.wind.speed * 3.6).toFixed(1);
  windEl.textContent = `${windSpeed} km/h`;

  weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIconEl.alt = data.weather[0].description;

  weatherDiv.style.display = 'block';
}

// Display error
function displayError(message) {
  errorText.textContent = message;
}
