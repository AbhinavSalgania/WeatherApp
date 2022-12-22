// Weather API key: f44d49ad0e3ac24ab2893e563a92fb01
// API call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Weather APP

//Function to get the weather data from the API

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f44d49ad0e3ac24ab2893e563a92fb01&units=metric`);
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
}

//Get the weather data and process it

function processData(weatherData) {
    const weather = {};
    weather.city = weatherData.name;
    weather.country = weatherData.sys.country;
    weather.description = weatherData.weather[0].description;
    weather.temperature = weatherData.main.temp;
    weather.humidity = weatherData.main.humidity;
    weather.windSpeed = weatherData.wind.speed;
    weather.icon = weatherData.weather[0].icon;
    return weather;
}

//Create HTML elements and display the weather data

function displayWeather(weather) {

    const city = document.querySelector('.city');
    city.innerText = `Location: ${weather.city}, ${weather.country}`;

    const description = document.querySelector('.description');
    description.innerText = `Description: ${weather.description}`;

    const temperature = document.querySelector('.temperature');
    temperature.innerText = `Temperature: ${weather.temperature}°C`;

    const humidity = document.querySelector('.humidity');
    humidity.innerText = `Humidity: ${weather.humidity}%`;

    const windSpeed = document.querySelector('.wind');
    windSpeed.innerText = `Wind Speed: ${weather.windSpeed} km/h`;

    const icon = document.querySelector('.icon');
    icon.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;

}

// Function to display the weather data

async function show(city) {
    const data = await getWeatherData(city);
    const weather = processData(data);
    displayWeather(weather);
}

// Function to get the city name from the input field

function getCity() {
    const city = document.querySelector('.searchBar').value;
    return city;
}

// Event listener for the search button

const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = getCity();
    show(city);
    clearInput();
});

// Function to clear the input field

function clearInput() {
    document.querySelector('.searchBar').value = '';
}

clearInput(); //clear the input field on page load


