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

const apiKey = "YOUR_API_KEY"; // Buraya kendi API anahtarınızı ekleyin
const lat = 44.34; // Enlem
const lon = 10.99; // Boylam

// 7 günlük hava tahminini almak için API'yi çağıran fonksiyon
async function getWeatherForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=metric`; // units=metric sıcaklık birimini Celcius olarak ayarlıyor

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Eğer API'den geçerli bir yanıt alırsak:
        if (data.cod === "200") {
            console.log(data);
            displayWeatherForecast(data);
        } else {
            console.error("Hata: " + data.message);
        }
    } catch (error) {
        console.error("API'yi çağırırken hata oluştu:", error);
    }
}

// Hava durumu tahminini sayfada görüntülemek için bir fonksiyon
function displayWeatherForecast(data) {
    const forecastContainer = document.querySelector(".forecast-container");
    forecastContainer.innerHTML = ""; // Mevcut içeriği temizle

    data.list.forEach((forecast) => {
        const day = new Date(forecast.dt * 1000).toLocaleDateString(); // Unix zaman damgasını tarih formatına çevir
        const temperature = forecast.temp.day; // Günlük sıcaklık
        const description = forecast.weather[0].description; // Hava durumu açıklaması

        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast");

        forecastElement.innerHTML = `
            <h3>${day}</h3>
            <p>Temperature: ${temperature}°C</p>
            <p>${description}</p>
        `;

        forecastContainer.appendChild(forecastElement);
    });
}

// Sayfa yüklendiğinde hava tahminini al
getWeatherForecast();


// Clear button event listener
clearBtn.addEventListener('click', () => {
    inputBox.value = ''; // Clear the input box
    location_not_found.style.display = "none"; // Hide the "location not found" message
    weather_body.style.display = "none"; // Hide the weather details
});
