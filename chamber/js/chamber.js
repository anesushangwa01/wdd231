
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Add a click event listener to toggle the menu
hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');  // Toggle the 'active' class to show/hide links
});



// OpenWeather API URL for current weather
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Harare,zw&APPID=6359c49dc3f6452175a11a317071ce5d"

// Fetch Current Weather Data
fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        const weatherContainer = document.getElementById('current-weather');
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        
        weatherContainer.innerHTML = `
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;
    })
    .catch(error => {
        console.error("Error fetching the current weather data:", error);
        document.getElementById('current-weather').innerHTML = '<p>Error loading weather data</p>';
    });
