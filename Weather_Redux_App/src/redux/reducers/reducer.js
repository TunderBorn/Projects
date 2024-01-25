const initialWeatherState = {
    currentWeather: null,
    forecastData: [],
  };
  
  export const weatherReducer = (state = initialWeatherState, action) => {
    switch (action.type) {
      case 'UPDATE_WEATHER':
        return {
          ...state,
          currentWeather: action.payload,
        };
      case 'UPDATE_FORECAST':
        return {
          ...state,
          forecastData: action.payload,
        };
      default:
        return state;
    }
  };