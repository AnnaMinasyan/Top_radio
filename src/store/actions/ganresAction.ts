

import { GanresTypes } from "../constants"

export const getGanresData = () => {
console.log("GET_GANRES_DATA");

	return {
		type: GanresTypes.GET_GANRES_DATA,
	
	};
};
export const setGanres= (payload:any) => {
	return {
		type: GanresTypes.SET_GANRES_DATA,
		payload
	
	};
};

