import { PlayListTypes } from "../constants"
export const getPlayList = (payload:number) => {
	return {
		type: PlayListTypes.GET_PLAY_LIST,
		payload
	};
};
export const setPlayList = (payload:number) => {
	return {
		type: PlayListTypes.SET_PLAY_LIST,
		payload
	};
};
