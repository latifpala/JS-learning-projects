document.addEventListener('DOMContentLoaded', function(){
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  
  const errorMessage = document.getElementById('error-message');

  const API_KEY = '39112e50279a34173413f2fb5de2e2c6'; // Set in ENV variables when making live

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if(!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayMessage('error', error);
    }
  });
  
  async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    // use fetch method to get the data from URL
    const response = await fetch(url);
    if(!response.ok){
      throw new Error("City not found");
    }

    // convert response to json data
    const data = response.json();
    return data;
  }

  function displayWeatherData(weatherData){
    const {name, main, weather} = weatherData;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    displayMessage('success');
  }

  function displayMessage(messageType, message = ''){
    if(messageType === 'error'){
      weatherInfo.classList.add('hidden');
      errorMessage.classList.remove('hidden');
    }else if(messageType === 'success'){
      weatherInfo.classList.remove('hidden');
      errorMessage.classList.add('hidden');
    }
  }

});