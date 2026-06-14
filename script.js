const API_KEY = "26650770b6ae7fcd53d98d53a922487c";

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city == "") {
    alert("⚠️ Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  weatherResult.innerHTML = `
    <div class="loading">
    🌦️ Fetching weather...
</div>  
  `

  fetch(url)
  .then(response => response.json())
  .then(data => {

    if(data.cod != 200){

        weatherResult.innerHTML = `
            <div class = "error-message">
            ⚠️ City not found
            </div>
            `
            return;
    }
    weatherResult.innerHTML = ` 
        <div class="weather-info">

    <h2>${data.name}</h2>

    <div class="weather-temp">
        ${Math.round(data.main.temp)}°C
    </div>

    <div class="weather-condition">
        ☁️ ${data.weather[0].main}
    </div>

    <div class="weather-stats">

        <div class="stat-card">
            <span>🌬️ Wind</span>
            <strong>${data.wind.speed} m/s</strong>
        </div>

        <div class="stat-card">
            <span>💧 Humidity</span>
            <strong>${data.main.humidity}%</strong>
        </div>

    </div>

</div>
    
    `
    
    console.log(data);});
});

cityInput.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        getWeatherBtn.click();
    }
})
