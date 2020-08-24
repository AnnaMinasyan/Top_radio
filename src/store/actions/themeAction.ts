import { ThemeTypes } from "../constants"


export const changeBackgroundColor = (payload:boolean) => {
	return {
		type: ThemeTypes.CHANGE_BACKGROUNDCOLOR,
		payload
	};
};
