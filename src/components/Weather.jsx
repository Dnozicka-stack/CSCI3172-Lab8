import { useState, useEffect } from 'react';

/**
 * Weather Component
 * Displays current weather information for Halifax using the OpenWeatherMap API
 * Shows temperature in Celsius and humidity percentage
 */
function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Halifax coordinates
  const HALIFAX_COORDS = {
    lat: 44.6488,
    lon: -63.5752
  };

  /**
   * useEffect hook to fetch weather data
   */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log('Fetching weather for Halifax');
        // Use the Netlify function instead of direct API call
        const response = await fetch(
          `/.netlify/functions/getWeather?lat=${HALIFAX_COORDS.lat}&lon=${HALIFAX_COORDS.lon}`
        );

        const data = await response.json();
        console.log('Weather API response:', data);

        if (!response.ok) {
          throw new Error(data.error || data.details || `HTTP error! status: ${response.status}`);
        }
        
        // Update weather state with relevant information
        setWeather({
          city: data.name,
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0].description
        });
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Return based on loading, error, or weather data
  if (loading) return (
    <div className="weather-card" role="region" aria-label="Weather Information">
      <div className="weather-card-content">
        <h3>Weather Information</h3>
        <div className="weather-info">
          <p aria-live="polite">Getting weather data for Halifax...</p>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="weather-card" role="region" aria-label="Weather Information">
      <div className="weather-card-content">
        <h3>Weather Information</h3>
        <div className="weather-info">
          <p className="error-message" role="alert">{error}</p>
          <p className="help-text">Please try again later.</p>
        </div>
      </div>
    </div>
  );
  
  if (!weather) return null;

  return (
    <div className="weather-card" role="region" aria-label="Weather Information">
      <div className="weather-card-content">
        <h3>Weather in Halifax</h3>
        <div className="weather-info">
          <div className="weather-detail">
            <span className="weather-label">Temperature:</span>
            <span className="weather-value" aria-label={`${weather.temperature} degrees Celsius`}>
              {weather.temperature}°C
            </span>
          </div>
          <div className="weather-detail">
            <span className="weather-label">Humidity:</span>
            <span className="weather-value" aria-label={`${weather.humidity} percent humidity`}>
              {weather.humidity}%
            </span>
          </div>
          <div className="weather-detail">
            <span className="weather-label">Conditions:</span>
            <span className="weather-value" aria-label={`Current conditions: ${weather.description}`}>
              {weather.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;