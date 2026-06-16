const API_KEY = "26650770b6ae7fcd53d98d53a922487c";

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

const weatherIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Snow: "❄️",
  Mist: "🌫️",
};


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
  `;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      

      if (data.cod != 200) {
        weatherResult.innerHTML = `
            <div class = "error-message">
            ⚠️ City not found
            </div>
            `;
        return;
      }

      const condition = data.weather[0].main;
      const icon = weatherIcons[condition] || "🌍";
      
  const sunrise = new Date(data.sys.sunrise * 1000)

const sunset = new Date(data.sys.sunset * 1000)

const sunriseTime = sunrise.toLocaleTimeString([], {
    hour : "2-digit",
    minute : "2-digit"
});

const sunsetTime = sunset.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"   
})
      weatherResult.innerHTML = ` 
        <div class="weather-info">

    <h2>${data.name}</h2>

    <div class="weather-temp">
    ${Math.round(data.main.temp)}°C
</div>

<div class="feels-like">
    Feels Like ${Math.round(data.main.feels_like)}°C
</div>

    <div class="weather-condition">
        ${icon} ${condition}
    </div>

    <div class="weather-stats">

    <div class="stat-card">
        <div class="stat-icon">🌬️</div>
        <div class="stat-value">${data.wind.speed} m/s</div>
        <div class="stat-label">Wind</div>
    </div>

    <div class="stat-card">
        <div class="stat-icon">💧</div>
        <div class="stat-value">${data.main.humidity}%</div>
        <div class="stat-label">Humidity</div>
    </div>

    <div class="stat-card">
    <div class="stat-icon">🌅</div>
    <div class="stat-value">${sunriseTime}</div>
    <div class="stat-label">Sunrise</div>
</div>

<div class="stat-card">
    <div class="stat-icon">🌇</div>
    <div class="stat-value">${sunsetTime}</div>
    <div class="stat-label">Sunset</div>
</div>

</div>        
    </div>

</div>
    
    `;

      console.log(data);
    });
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    getWeatherBtn.click();
  }
});
