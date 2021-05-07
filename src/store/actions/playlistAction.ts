import { PlayListTypes } from "../constants"
import { IPlayListState } from "../reducers/playListReducer";
export const getPlayList = (payload:any) => {
	return {
		type: PlayListTypes.GET_PLAY_LIST,
		payload
	};
};
export const getTrackList = (payload:any) => {
	return {
		type: PlayListTypes.GET_TRACK_LIST,
		payload
	};
};
export const setPlayList = (payload:IPlayListState |undefined) => {
	
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

export const setHeaderText = (payload:any) => {
	
	return {
		type: PlayListTypes.SET_HEADER_TEXT,
		payload
	};
};
export const changeSwiperListType = (payload:string) => {
	
	return {
		type: PlayListTypes.CHANGE_SWIPER_LIST_TYPE,
		payload
	};
};
export const setSwiperListType = (payload:string) => {
	
	return {
		type: PlayListTypes.SET_SWIPER_LIST_TYPE,
		payload
	};
};