

import { CitiesTypes } from "../constants"
// interface IMenuPayload {
// 	menuType?: boolean,
	
// }

// export const changeMenuType = (payload: Partial<IMenuPayload>) => {
// 	return {
// 		type: MenuTypes.CHANGE_MENU_TYPE,
// 		payload,
// 	};
// };
export const getCitiesData = () => {

	return {
		type: CitiesTypes.GET_CITIES_DATA,
	
	};
};
export const setCities= (payload:any) => {
	return {
		type: CitiesTypes.SET_CITIES_DATA,
		payload
	
	};
};

