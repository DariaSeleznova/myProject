// weather.js
const cities = [
    { id: "London", query: "q=London" },
    { id: "Kyiv", query: "q=Kyiv" },
    { id: "New-York", query: "id=5128581" }
];

const apiKey = '9fbd8afc7a9c9d3037123bac27f7e3a3';

async function loadWeatherInfo(city) {
    const weatherBlock = document.querySelector(`#${city.id}`);
    if (!weatherBlock) return;

    const infoUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&${city.query}&appid=${apiKey}`;
    try {
        const response = await fetch(infoUrl);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data, weatherBlock);
        } else {
            weatherBlock.innerHTML = data.message;
        }
    } catch (error) {
        weatherBlock.innerHTML = "Error fetching weather data";
    }
}

function displayWeather(data, weatherBlock) {
    const cityName = data.name;
    const temp = Math.round(data.main.temp);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
        <div id="weather_header${cityName}" style="display: flex; flex-direction: row;">
            <div id="weather_main${cityName}">
                <div id="weather_${cityName}">${cityName}</div>
                <div id="weather_status${cityName}">${weatherStatus}</div>
                <div id="weather_icon${cityName}">
                   <img src='http://openweathermap.org/img/w/${weatherIcon}.png' alt="${weatherStatus}">
                </div>
            </div>
            
            <div id="weather_temp${cityName}">${temp} °</div>
        </div>`;
    weatherBlock.innerHTML = template;
}

cities.forEach(loadWeatherInfo);

document.getElementById('searchButton').addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    if (cityName) {
        const weatherBlock = document.getElementById('userCity');
        const infoUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
        try {
            const response = await fetch(infoUrl);
            const data = await response.json();
            if (response.ok) {
                displayWeather(data, weatherBlock);
            } else {
                weatherBlock.innerHTML = data.message;
            }
        } catch (error) {
            weatherBlock.innerHTML = "Error fetching weather data";
        }
        cityInput.value = '';
    }
});