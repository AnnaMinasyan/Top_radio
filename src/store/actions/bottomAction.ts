import {BottomType} from "../constants"
export const changeplayItem = (payload: any) => {
	console.log("changeplayItem",payload);
		
	return {
		type: BottomType.CHANGE_PLAY_ITEM,
		payload
	};
};
export const setplayItem = (payload: any) => {	
	return {
		type: BottomType.SET_PLAY_ITEM,
		payload
	};
};
export const setplayItemArtistandSong = (payload: any) => {	
	return {
		type: BottomType.SET_PLAY_ITEM_ARTIST_SONG,
		payload
	};
};
export const chnageplayItemArtistandSong = (payload: any) => {	
    
	return {
		type: BottomType.CHANGE_PLAY_ITEM_ARTIST_SONG,
		payload
	};
};
export const changePlayingData = (payload: any) => {	
	return {
		type: BottomType.CHANGE_PLAYING_DATA,
		payload
	};
};
export const setPlayingData = (payload: any) => {	
	return {
		type: BottomType.SET_PLAYING_DATA,
		payload
	};
};
export const changeActiveIndex = (payload: number) => {

	return {
		type: BottomType.CHANGE_ACTIVE_INDEX,
		payload

	};
}; export const setActiveIndex = (payload: number) => {


	return {
		type: BottomType.SET_ACTIVE_INDEX,
		payload

	};
};
export const changeActiveBi = (payload: number) => {

	return {
		type: BottomType.CHANGE_ACTIVE_BI,
		payload

	};
}; export const setActiveBi = (payload: number) => {


	return {
		type: BottomType.SET_ACTIVE_BI,
		payload

	};
};