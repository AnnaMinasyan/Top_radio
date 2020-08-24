import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import citiesReducer from "./citiesReducer"
import ganresReducer from "./ganresReducer"
import filterReducer from "./filterReducer"
import playListReducer from "./playListReducer"
import favoritesReducer from "./favoritesReducer";
import themeReducer from "./themeReducer"
const allReducers = combineReducers({
     menuReducer,
     citiesReducer,
     ganresReducer,
     filterReducer,
     playListReducer,
     favorites:favoritesReducer,
     theme:themeReducer
    
});
export default allReducers;
