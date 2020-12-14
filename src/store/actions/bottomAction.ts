import {BottomType} from "../constants"
export const changeplayItem = (payload: any) => {
		
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
export const getSongData = (payload: any) => {



	return {
		type: BottomType.GET_SONG_DATA,
		payload

	};
};
export const setSelectedRadioStation = (payload: any) => {
	console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
		return {
			type: BottomType.SET_SELECTED_RADIOSTATION,
			payload
	
		};
	};
	export const changeSelectedRadioStation = (payload: any) => {
		return {
			type: BottomType.CHANGE_SELECTED_RADIOSTATION,
			payload
	
		};
	};
	export const setSelectedRadioStationPlaying = (payload: any) => {

		
		return {
			type: BottomType.SET_SELECTED_RADIOSTATION_PLAYMUSIC,
			payload
	
		};
	};
	export const changeSelectedRadioStationPlaying = (payload: any) => {

		
		return {
			type: BottomType.CHANGE_SELECTED_RADIOSTATION_PLAYMUSIC,
			payload
	
		};
	};
	export const setSwiperShowStation = (payload: any) => {

		return {
			type: BottomType.SET_SWIPERSHOW_RADIOSTATION,
			payload
	
		};
	};
	export const changeSwiperShowStation = (payload: any) => {
		return {
			type: BottomType.CHANGE_SWIPERSHOW_RADIOSTATION,
			payload
	
		};
	};
	export const setSwiperPlayingSong= (payload: any) => {

		return {
			type: BottomType.SET_SWIPERSHOW_RADIOSTATION_PLAYINGSONG,
			payload
	
		};
	};
	export const changeSwiperPlayingSong = (payload: any) => {
		return {
			type: BottomType.CHANGE_SWIPERSHOW_RADIOSTATION_PLAYINGSONG,
			payload
	
		};
	};
	export const setSwiperActiveBi= (payload: any) => {

		
		return {
			type: BottomType.SET_SWIPERSHOW_RADIOSTATION_ACTIVEBI,
			payload
	
		};
	};
	export const changeSwiperActiveBi = (payload: any) => {
		return {
			type: BottomType.CHANGE_SWIPERSHOW_RADIOSTATION_ACTIVEBI,
			payload
	
		};
	};
	export const changeActiveArrow= (payload: any) => {

		
		return {
			type: BottomType.CHANGE_ACTIVEARROW,
			payload
	
		};
	};
	export const setActiveArrow = (payload: any) => {
		return {
			type: BottomType.SET_ACTIVEARROW,
			payload
	
		};
	};
	export const changeMiniScreenData = (payload: any) => {
	return {
		type: BottomType.CHANGE_MINI_SCREENDATA,
		payload

	};
};
export const setMiniScreenData = (payload: any) => {
	return {
		type: BottomType.SET_MINI_SCREENDATA,
		payload

	};
};
export const changeSelectedSatationbyBi = (payload: any) => {
	return {
		type: BottomType.CHANGE_SELECTED_STATION_BY_BI,
		payload

	};
};