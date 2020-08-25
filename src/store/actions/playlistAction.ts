import { PlayListTypes } from "../constants"
export const getPlayList = (payload:number) => {
	return {
		type: PlayListTypes.GET_PLAY_LIST,
		payload
	};
};
export const setPlayList = (payload:any) => {
	
	return {
		type: PlayListTypes.SET_PLAY_LIST,
		payload
	};
};
export const setTrackList = (payload:any) => {
	
	return {
		type: PlayListTypes.SET_TRACK_LIST,
		payload
	};
};

