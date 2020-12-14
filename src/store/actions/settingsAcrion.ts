import { SettingsType } from "../constants";
export const changeAutoPlay = (payload:boolean) => {
	return {
        type: SettingsType.CHANGE_AUTO_PLAY,
        payload
	};
};
export const setAutoPlay = (payload:boolean) => {
	return {
        type: SettingsType.SET_AUTO_PLAY,
        payload
	};
};
export const initAutoPlay= () => {
	return {
		type: SettingsType.INIT_AUTO_PLA
	};
};
export const setBufferSize = (payload:string) => {

	
	return {
        type: SettingsType.SET_BUFFER_SIZE,
        payload
	};
};
export const changeBufferSize= (payload:string) => {


	return {
		type: SettingsType.CHANGE_BUFFER_SIZE,
		payload
	};
};
export const changeIsOnheadsets= (payload:boolean) => {


	return {
		type: SettingsType.CHANGE_IS_ON_HEADSES,
		payload
	};
};
export const setIsOnheadsets= (payload:boolean) => {


	return {
		type: SettingsType.SET_IS_ON_HEADSES,
		payload
	};
};