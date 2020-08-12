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