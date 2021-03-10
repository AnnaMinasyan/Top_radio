import { MenuTypes } from "../constants"

export const getMenuData = () => {
	return {
		type: MenuTypes.GET_MENU_DATA,
	};
};
export const setMenuData = (payload: any) => {
	return {
		type: MenuTypes.SET_MENU_DATA,
		payload

	};
};
export const setFilterData = (payload: any) => {
	return {
		type: MenuTypes.SET_FILTER_DATA,
		payload

	};
};
export const setPlayList = (payload: any) => {
	return {
		type: MenuTypes.SET_PLAY_LIST,
		payload

	};
};

export const changeFilterData = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_FILTER_DATA,
		payload

	};
};
export const changeHeaderText = (payload: string) => {
	
	return {
		type: MenuTypes.CHANGE_HEADERTEXT,
		payload

	};
};
export const setHeaderText = (payload: string) => {
	
	return {
		type: MenuTypes.SET_HEADERTEXT,
		payload

	};
};



export const setPlayingData = (payload: any) => {

	return {
		type: MenuTypes.SET_PLAYINGDATA,
		payload
	};
};
export const setSwiperData = (payload: any) => {
	return {
		type: MenuTypes.SET_SWIPER_DATA,
		payload
	};
};
export const changeSwiperData = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_SWIPER_DATA,
		payload
	};
};
export const changeInitialRouteName = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_ACTIVE_INITIALROUTE_NAME,
		payload
	};
};
export const setInitialRouteName = (payload: any) => {
	return {
		type: MenuTypes.SET_ACTIVE_INITIALROUTE_NAME,
		payload
	};
};
export const setLookingList = (payload: any) => {
	return {
		type: MenuTypes.SET_LOOKING_LIST,
		payload
	};
};
export const changeLookingList = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_LOOKING_LIST,
		payload
	};
};
export const setFavoriteList = (payload: any) => {
	
	return {
		type: MenuTypes.SET_FAVORITE_LIST,
		payload
	};
};
export const changeSearchData = (payload: any) => {
	
	return {
		type: MenuTypes.CHANGE_SEARCH_DATA,
		payload
	};
};
export const setSearchData = (payload: any) => {
	
	return {
		type: MenuTypes.SET_SEARCH_DATA,
		payload
	};
};