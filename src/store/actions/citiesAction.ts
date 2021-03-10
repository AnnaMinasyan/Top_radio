

import { CitiesTypes } from "../constants"

export const getCitiesData = () => {

	return {
		type: CitiesTypes.GET_CITIES_DATA,
	
	};
};
export const setCities= (payload:any) => {
	return {
		type: CitiesTypes.SET_CITIES_DATA,
		payload
	
	};
};
export const changeFilterCities= (payload:any) => {
	return {
		type: CitiesTypes.CHANGE_FILTER_CITIES_DATA,
		payload
	
	};
};
export const setFilterCities= (payload:any) => {
	return {
		type: CitiesTypes.SET_FILTER_CITIES_DATA,
		payload
	
	};
};
