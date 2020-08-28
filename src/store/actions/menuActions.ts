import { MenuTypes } from "../constants"
interface IMenuPayload {
	menuType?: boolean,
	
}
export const getMenuData = () => {
	return {
		type: MenuTypes.GET_MENU_DATA,
	};
};
export const setMenuData = (payload:any) => {
	return {
		type: MenuTypes.SET_MENU_DATA,
		payload
	
	};
};
export const setPlayList = (payload:any) => {
	return {
		type: MenuTypes.SET_PLAY_LIST,
		payload
	
	};
};

export const changeFilterData = (payload:any) => {
	return {
		type: MenuTypes.CHANGE_FILTER_DATA,
		payload
	
	};
};
export const changeFilterDataByGenre = (payload:any) => {
	return {
		type: MenuTypes.CHANGE_FILTER_DATA_BY_GENRE,
		payload
	
	};
};
export const chnageFavorite = (payload:any) => {
	return {
		type: MenuTypes.CHANGE_FAVORITE,
		payload
	
	};
};