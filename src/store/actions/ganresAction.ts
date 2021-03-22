

import { GanresTypes } from "../constants"

export const getGanresData = () => {

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
export const changeFilterGanres= (payload:any) => {
	
	return {
		type: GanresTypes.CHANGE_FILTER_GANRE,
		payload
	
	};
};
export const setFilterGanres= (payload:any) => {	
	return {
		type: GanresTypes.SET_FILTER_GANRE,
		payload
	
	};
};
