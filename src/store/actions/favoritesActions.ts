import { FavoriteType } from "../constants";

export const setFavorites = (payload:any) => {
	return {
		type: FavoriteType.SET,
		payload
	};
};

export const addFavorites = (payload:any) => {

	return {
		type: FavoriteType.ADD,
		payload
	};
};
export const initFavorites = () => {
	return {
		type: FavoriteType.INIT
	};
};
export const appCreateFavorites = (payload:any) => {
	return {
		type: FavoriteType.APP_CREATE,
		payload
	};
};
export const deleteIsFavorite = (payload:any) => {
	return {
		type: FavoriteType.DELET_IS_FAVORITE,
		payload
	};
};