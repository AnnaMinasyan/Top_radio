import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import citiesReducer from "./citiesReducer"
import ganresReducer from "./ganresReducer"
import filterReducer from "./filterReducer"
const allReducers = combineReducers({
     menuReducer,
     citiesReducer,
     ganresReducer,
     filterReducer
    
});
export default allReducers;
