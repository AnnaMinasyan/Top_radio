import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import citiesReducer from "./citiesReducer"
import ganresReducer from "./ganresReducer"
import filterReducer from "./filterReducer"
import playListReducer from "./playListReducer"
const allReducers = combineReducers({
     menuReducer,
     citiesReducer,
     ganresReducer,
     filterReducer,
     playListReducer
    
});
export default allReducers;
