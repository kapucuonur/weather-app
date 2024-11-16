const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Hava durumu kontrol fonksiyonu
async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const api_key = "4cd0eee81294c867b4bc4cfc64e998c5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        // API çağrısı
        const weather_data = await fetch(url).then(response => response.json());

        // Eğer şehir bulunamazsa
        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found.");
            return;
        }

        // Başarıyla veri alındığında
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        
        // Sıcaklık, açıklama, nem ve rüzgar hızını göster
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        // Hava durumuna göre görsel değişimi
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
            default:
                weather_img.src = "/assets/cloud.png"; // Varsayılan görsel
        }

        console.log(weather_data);
    } catch (error) {
        // API çağrısı sırasında bir hata olursa
        console.error("Error fetching the weather data:", error);
        alert("Something went wrong. Please try again later.");
    }
}

// Arama butonuna tıklama olayını dinle
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    checkWeather(city);
});

// Enter tuşu ile de arama yapılabilmesi için
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = inputBox.value.trim();
        checkWeather(city);
    }
});
