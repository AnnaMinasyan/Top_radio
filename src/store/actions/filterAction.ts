import { FilterTypes } from "../constants"


export const changeFavoriteType = () => {
	return {
		type: FilterTypes.CHANGE_IS_FAVORITE,
	};
};
export const changeisActive = (payload:string) => {
	
	
	return {
		type: FilterTypes.CHANGE_IS_ACTIVE,
		payload
	};
};

export const changePlayingMusic = (payload:boolean) => {
	return {
		type: FilterTypes.CHANGE_PLAYING_MUSIC,
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

export const initMenuType = () => {
	return {
		type: FilterTypes.INIT_MENU_TYPE,
	};
};
export const getMenuType = (payload:number) => {
	//console.log("payload",payload);
	
	return {
		type: FilterTypes.GET_MENU_TYPE,
		payload
	};
};
export const setMenuType = (payload:number) => {
	return {
		type: FilterTypes.SET_MENU_TYPE,
		payload
	};
};