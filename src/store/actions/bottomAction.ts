import {BottomType} from "../constants"
export const changeplayItem = (payload: any) => {
	console.log("changeplayItem");
		
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