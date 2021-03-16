import { ThemeTypes } from "../constants"


export const changeBackgroundColor = (payload:boolean) => {
	return {
		type: ThemeTypes.CHANGE_BACKGROUNDCOLOR,
		payload
	};
};
export const setHeightWidth = (payload:any) => {	
	return {
		type: ThemeTypes.SET_HEIGHT_WIDTH,
		payload
	};
};
