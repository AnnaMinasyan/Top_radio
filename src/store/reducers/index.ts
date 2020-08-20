import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import citiesReducer from "./citiesReducer"
import ganresReducer from "./ganresReducer"
import filterReducer from "./filterReducer"
import playListReducer from "./playListReducer"
import favoritesReducer from "./favoritesReducer";
const allReducers = combineReducers({
     menuReducer,
     citiesReducer,
     ganresReducer,
     filterReducer,
     playListReducer,
     favorites:favoritesReducer
    
});
export default allReducers;
