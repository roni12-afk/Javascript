// DOM Elements
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const countryTxt = document.querySelector('.country-text');
const tempTxt = document.querySelector('.temp-text');
const conditionTxt = document.querySelector('.condition-text');
const humidityValueTxt = document.querySelector('.humidity-value-text');
const windValueTxt = document.querySelector('.wind-value-text');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-data-text');
const forecastsItemsContainer = document.querySelector('.forecast-item-container');

// API Key
const apikey = 'a2f1592de45cb17df4e306ddcea49f58';

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        updateWeatherInfo(city);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        const city = cityInput.value.trim();
        updateWeatherInfo(city);
        cityInput.value = '';
        cityInput.blur();
    }
});

// Fetch Data from API
async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Map Weather ID to Icon
function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id <= 800) return 'clear.svg';
    if (id <= 804) return 'clouds.svg';
    return 'clouds.svg';
}

// Get Current Date
function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return currentDate.toLocaleDateString('en-GB', options);
}

// Update Weather Info
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);
    if (!weatherData || weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + ' °C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + ' M/s';
    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

    await updateForecastsInfo(city);
    showDisplaySection(weatherInfoSection);
}

// Update Forecast Info
async function updateForecastsInfo(city) {
    const forecastData = await getFetchData('forecast', city);
    if (forecastData && forecastData.cod === "200") {
        console.log(forecastData);

        const timeTaken = '12:00:00';
        const todayDate = new Date().toISOString().split('T')[0];

        forecastsItemsContainer.innerHTML = ''; // Clear previous forecast items
        forecastData.list.forEach(forecastWeather => {
            const forecastDate = forecastWeather.dt_txt.split(' ')[0];
            if (forecastWeather.dt_txt.includes(timeTaken) && forecastDate !== todayDate) {
                updateForecastsItems(forecastWeather);
                console.log(forecastWeather);
            }
        });
    }
}

// Update Individual Forecast Item
function updateForecastsItems(weatherData) {
    const { dt_txt: date, weather: [{ id }], main: { temp } } = weatherData;

    const forecastDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
    });

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular-text">${forecastDate}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
        </div>
    `;

    forecastsItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

// Show Specific Section
function showDisplaySection(sectionToShow) {
    [weatherInfoSection, searchCitySection, notFoundSection].forEach(section => {
        section.style.display = 'none';
    });
    sectionToShow.style.display = 'flex';
}









