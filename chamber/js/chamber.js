
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Add a click event listener to toggle the menu
hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');  // Toggle the 'active' class to show/hide links
});



const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Harare,zw&appid=6359c49dc3f6452175a11a317071ce5d"; 

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Harare,zw&appid=6359c49dc3f6452175a11a317071ce5d`;

fetch(apiURL)
    .then(response => {
        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsObject => {
        console.log(jsObject);
        
        // Extract temperature in Celsius
        const tempCelsius = Math.round(jsObject.main.temp_max - 273.15);
        
        // Update the current weather content
        document.querySelector('#current-weather').innerHTML = `
            <p>Temperature: ${tempCelsius}°C</p>
            <p>Condition: ${jsObject.weather[0].description.charAt(0).toUpperCase() + jsObject.weather[0].description.slice(1)}</p>
        `;
        
        // Update the weather icon
        const iconsrc = `https://openweathermap.org/img/w/${jsObject.weather[0].icon}.png`;
        const desc = jsObject.weather[0].description;
        // document.querySelector('#weathericon').setAttribute('src', iconsrc);
        // document.querySelector('#weathericon').setAttribute('alt', desc);
        
        // Update wind speed
        const windSpeed = jsObject.wind.speed;
        const speedElement = document.querySelector('#speed');
        if (speedElement) {
            speedElement.textContent = windSpeed;
        }

        // Calculate wind chill
        if (tempCelsius <= 50 && windSpeed > 3) {
            const windchill = 35.74 + 0.6215 * tempCelsius - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * tempCelsius * Math.pow(windSpeed, 0.16);
            document.querySelector("#windchill").innerHTML = `Wind Chill: ${Math.round(windchill)}&#176;`;
        } else {
            document.querySelector("#windchill").innerHTML = "Wind Chill: N/A";
        }

        // Additional weather data: Humidity, Sunrise, Sunset
        const humidity = jsObject.main.humidity;
        const sunrise = new Date(jsObject.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(jsObject.sys.sunset * 1000).toLocaleTimeString();

        document.querySelector('#current-weather').innerHTML += `
            <p>Humidity: ${humidity}%</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;
    })
    .catch(error => {
        console.error("Error fetching the current weather data:", error);
        document.getElementById('current-weather').innerHTML = '<p>Error loading weather data</p>';
    });


    fetch(forecastUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ""; // Clear loading text

        // Process forecast data for the next 5 days
        const forecastDays = {};
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name

            if (!forecastDays[dayName]) {
                forecastDays[dayName] = {
                    temp: Math.round(forecast.main.temp_max - 273.15), // Max temp
                    description: forecast.weather[0].description,
                };
            }
        });

        // Display the forecast for the next 5 days
        for (const [dayName, { temp, description }] of Object.entries(forecastDays)) {
            // Convert Celsius to Fahrenheit for display
            const tempFahrenheit = Math.round((temp * 9/5) + 32);
            forecastContainer.innerHTML += `
                <p>${dayName}: ${tempFahrenheit}°F</p>
            `;
        }
    })
    .catch(error => {
        console.error("Error fetching the upcoming weather data:", error);
        document.getElementById('forecast-container').innerHTML = '<p>Error loading forecast data</p>';
    });



    const requestURL = 'https://anesushangwa01.github.io/wdd231/chamber/data/members.json';
const cards = document.querySelector('.card');
const listButton = document.querySelector("#list-btn");
const cardButton = document.querySelector("#card-btn");

// Async function to fetch and display data
async function fetchBusinesses() {
    try {
        const response = await fetch(requestURL);
        const jsonObject = await response.json();
        console.table(jsonObject); // Temporary checking for valid response and data parsing
        const businesses = jsonObject['busineses']; // Ensure this key matches your JSON structure

        // Limit to displaying only the first 3 businesses
        businesses.slice(0, 3).forEach(displayBusinessesGrid); // Display only first 3 businesses
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display businesses in grid view
function displayBusinessesGrid(business) {
    const card = document.createElement('section');
    const image = document.createElement('img');
    const membershipLevel = document.createElement('p');
    const phoneNumber = document.createElement('p');
    const location = document.createElement('p');
    const website = document.createElement('a'); // Changed from <p> to <a> for website

    image.src = business.imageurl;
    image.setAttribute('alt', business.name);
    image.style.width = '100px';
    image.style.height = 'auto';
    card.appendChild(image);
    
    membershipLevel.textContent = `Membership level: ${business.membershiplevel}`;
    card.appendChild(membershipLevel);

    phoneNumber.textContent = `Phone number: ${business.phonenumber}`;
    card.appendChild(phoneNumber);

    location.textContent = `Location: ${business.name}`;
    card.appendChild(location);

    website.textContent = 'Website'; // Text for the link
    website.href = business.website; // Correctly setting the href attribute
    website.target = '_blank'; // Open in a new tab
    card.appendChild(website);

    cards.appendChild(card);
}

// Call the function to fetch and display businesses
fetchBusinesses();