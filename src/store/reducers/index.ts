import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import citiesReducer from "./citiesReducer"
import ganresReducer from "./ganresReducer"
import filterReducer from "./filterReducer"
import playListReducer from "./playListReducer"
import favoritesReducer from "./favoritesReducer";
import themeReducer from "./themeReducer"
import settingsReducer from "./settingsReducer"
import bottomReducer from "./bottomReducer"
const allReducers = combineReducers({
     menuReducer,
     citiesReducer,
     ganresReducer,
     filterReducer,
     playListReducer,
     favorites:favoritesReducer,
     theme:themeReducer,
     settingsReducer,
     bottomReducer
    
});
export default allReducers;
