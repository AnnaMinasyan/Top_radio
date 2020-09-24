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
export const changeFilterDataByGenre = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_FILTER_DATA_BY_GENRE,
		payload

	};
};
export const chnageFavorite = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_FAVORITE,
		payload

	};
};
export const changeActiveIndex = (payload: number) => {
	return {
		type: MenuTypes.CHANGE_ACTIVE_INDEX,
		payload

	};
}; export const setActiveIndex = (payload: number) => {


	return {
		type: MenuTypes.SET_ACTIVE_INDEX,
		payload

	};
};
export const changeplayItem = (payload: any) => {
	return {
		type: MenuTypes.CHANGE_PLAY_ITEM,
		payload
	};
};
export const changePlayingData = (payload: any) => {
	console.log("icen uruhgtpegeoe", payload);

	return {
		type: MenuTypes.CHANGE_PLAYINGDATA,
		payload
	};
};
export const setPlayingData = (payload: any) => {
	console.log("payloadpayload", payload);

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