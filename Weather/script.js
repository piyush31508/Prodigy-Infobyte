document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '43ecd088e4138b86794931cfa4a81110'; // Replace with your OpenWeatherMap API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const city = 'Jabalpur'; // Replace with the city you want to get weather for

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            weatherInfo.innerHTML = `
                <h2>${city} Weather</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
