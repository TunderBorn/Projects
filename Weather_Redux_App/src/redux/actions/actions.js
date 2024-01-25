export const searchWeather = (city) => {
    return {
      type: 'SEARCH_WEATHER',
      payload: city,
    };
  };
  
  export const updateWeather = (weatherData) => {
    return {
      type: 'UPDATE_WEATHER',
      payload: weatherData,
    };
  };
  
  export const updateForecast = (forecastData) => {
    return {
      type: 'UPDATE_FORECAST',
      payload: forecastData,
    };
  };