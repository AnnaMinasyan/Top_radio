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