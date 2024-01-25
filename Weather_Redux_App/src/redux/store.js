import { createStore, combineReducers } from 'redux';
import { weatherReducer } from './reducers/reducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

const store = createStore(rootReducer);

export default store;