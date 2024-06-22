import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(''); // Reset input to blank
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchWeather();
  };

  return (
    <div className='weather-container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className='weather-info'>
          <div className='info-text'>
            <h2>Weather Data</h2>
            <p>{weatherData.name}</p>
            <p>{weatherData.main.temp.toFixed()} °F</p>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt='Weather Logo'
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
