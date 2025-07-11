const API_KEY = "f23ee9deb4e1a7450f3157c44ed020e1";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");
  const errorMessage = document.getElementById("errorMessage");

  weatherResult.innerHTML = " "
  errorMessage.innerHTML = " "

  if (!city) {
    errorMessage.textContent = "Please enter city name.";
    return;
  }

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
  
  if (geoData.length === 0) {
    errorMessage.textContent = "Location not found, please try again.";
  }

  const { lat, lon, name } = geoData[0];

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  const temp = weatherData.main.temp;
  const description = weatherData.weather[0].description;

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${temp} °C</p>
    <p><strong>Conditions:</strong> ${description}</p>
  `;

  document.getElementById("cityInput").value = "";
  
  } 
  catch (error) {
    console.error("Error fecthing data:", error)
    errorMessage.textContent = "Something went wrong. Please try again.";
  }

}

document.getElementById("getWeatherBtn").addEventListener("click", getWeather);