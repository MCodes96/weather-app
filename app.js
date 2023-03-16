const apiKey = '6c28b68bb0a449f7b86104421231103';

const form = document.querySelector('.weather-form');
const input = document.querySelector('.city-input');

const weatherDisplay = document.querySelector('.weather-display');
const errDisplay = document.querySelector('.error-message');
const cityDisplay = document.querySelector('.city-name');
const iconDisplay = document.querySelector('.icon-container');
const tempDisplay = document.querySelector('.temp');
const conditionDisplay = document.querySelector('.condition');
const dateDisplay = document.querySelector('.date');
const windDisplay = document.querySelector('.wind-speed');
const humidityDisplay = document.querySelector('.humidity');
const rainDisplay = document.querySelector('.rain');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputValue = input.value;

    const imperialUnits = document.querySelector('.unit-switch:checked');

    if (!inputValue) {
        errDisplay.textContent = 'Please enter a location.';
        return;
    }

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputValue}`;

    const data = await (await fetch(url)).json();
    console.log(data);

    if (data.error) {
        errDisplay.textContent = 'Please enter a valid location.';
        return;
    }

    weatherDisplay.style.display = 'flex';
    setTimeout(() => {
        weatherDisplay.style.opacity = 1;
    }, 100);

    const weatherIcon = document.createElement('img');
    const timeStamp = data.location.localtime_epoch;

    weatherIcon.setAttribute('src', `${data.current.condition.icon}`);

    errDisplay.textContent = '';
    cityDisplay.textContent = '';
    iconDisplay.textContent = '';
    tempDisplay.textContent = '';
    conditionDisplay.textContent = '';
    dateDisplay.textContent = '';
    windDisplay.textContent = '';
    humidityDisplay.textContent = '';
    rainDisplay.textContent = '';

    cityDisplay.textContent = data.location.name;
    iconDisplay.appendChild(weatherIcon);
    tempDisplay.textContent = imperialUnits
        ? data.current.temp_f
        : data.current.temp_c;
    conditionDisplay.textContent = data.current.condition.text;
    dateDisplay.textContent = moment.unix(timeStamp).format('dddd, DD MMMM ');
    windDisplay.textContent = imperialUnits
        ? data.current.wind_mph + ' mph'
        : data.current.wind_kph + ' km/h';
    humidityDisplay.textContent = data.current.humidity + '%';
    rainDisplay.textContent =
        data.forecast.forecastday[0].day.daily_chance_of_rain + '%';
});
