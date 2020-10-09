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
	console.log("xxxx",payload);
	
	return {
        type: SettingsType.SET_BUFFER_SIZE,
        payload
	};
};
export const changeBufferSize= (payload:string) => {
	console.log("LL",payload);

	return {
		type: SettingsType.CHANGE_BUFFER_SIZE,
		payload
	};
};
export const changeIsOnheadsets= (payload:boolean) => {
	console.log("LL",payload);

	return {
		type: SettingsType.CHANGE_IS_ON_HEADSES,
		payload
	};
};
export const setIsOnheadsets= (payload:boolean) => {
	console.log("LL",payload);

	return {
		type: SettingsType.SET_IS_ON_HEADSES,
		payload
	};
};