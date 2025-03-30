export const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Get lat and lon from query parameters
    const { lat, lon } = event.queryStringParameters;
    
    if (!lat || !lon) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Missing latitude or longitude parameters' })
      };
    }

    // Get API key from environment variable
    const API_KEY = process.env.WEATHER_API_KEY;
    
    if (!API_KEY) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Weather API key not configured' })
      };
    }

    // Make request to OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' })
    };
  }
}; 