import { FilterTypes } from "../constants"


export const changeFavoriteType = () => {
	return {
		type: FilterTypes.CHANGE_IS_FAVORITE,
	};
};
export const changeisLooking = () => {
	return {
		type: FilterTypes.CHANGE_IS_LOOKING,
	};
};
export const changeswipeablePanelActive = (payload:boolean) => {
	console.log(";;;;;;",payload);
	
	return {
		type: FilterTypes.CHANGE_SWIPEABLEPANELACTIVE,
		payload
	};
};
export const changePlayingMusic = (payload:boolean) => {
	return {
		type: FilterTypes.CHANGE_PLAYING_MUSIC,
		payload
	};
};
export const changeplayItem = (payload:boolean) => {
	return {
		type: FilterTypes.CHANGE_PLAY_ITEM,
		payload
	};
};
export const changeBackgroundColor = (payload:boolean) => {
	return {
		type: FilterTypes.CHANGE_BACKGROUNDCOLOR,
		payload
	};
};
export const getFavorites = (payload:any) => {
	return {
		type: FilterTypes.GET_FAVORITES,
		payload
	
	};
};
export const addFavorite = (payload:any) => {
	return {
		type: FilterTypes.ADD_FAVORITE,
		payload
	
	};
};
export const changeSearchData = (payload:any) => {
	return {
		type: FilterTypes.CHANGE_SHEARCH_DATA,
		payload
	
	};
};