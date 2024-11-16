const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn'); // Clear button element
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "c2508fbeb78fab73cc595f8c10aab89a"; // Your API key
    const url = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === "404") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Location not found");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Update weather data
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    // Set the weather image based on the condition
    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
    }
}

// Search button event listener
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Clear button event listener
clearBtn.addEventListener('click', () => {
    inputBox.value = ''; // Clear the input box
    location_not_found.style.display = "none"; // Hide the "location not found" message
    weather_body.style.display = "none"; // Hide the weather details
});
