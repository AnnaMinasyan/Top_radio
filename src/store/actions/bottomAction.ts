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
	console.log("payloadpayloadpayload",payload);
	

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
console.log('payload',payload);


	return {
		type: BottomType.GET_SONG_DATA,
		payload

	};
};
export const setSelectedRadioStation = (payload: any) => {
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
		console.log("action");
		
		return {
			type: BottomType.SET_SELECTED_RADIOSTATION_PLAYMUSIC,
			payload
	
		};
	};
	export const changeSelectedRadioStationPlaying = (payload: any) => {
		console.log("ppppppppppppppp",payload);
		
		return {
			type: BottomType.CHANGE_SELECTED_RADIOSTATION_PLAYMUSIC,
			payload
	
		};
	};
	export const setSwiperShowStation = (payload: any) => {
		console.log("action");
		
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
		console.log("action");
		
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
		console.log("action",payload);
		
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