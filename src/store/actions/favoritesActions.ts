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