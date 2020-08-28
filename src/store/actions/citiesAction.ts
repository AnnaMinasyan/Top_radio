

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

