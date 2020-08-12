

import { GanresTypes } from "../constants"
// interface IMenuPayload {
// 	menuType?: boolean,
	
// }

// export const changeMenuType = (payload: Partial<IMenuPayload>) => {
// 	return {
// 		type: MenuTypes.CHANGE_MENU_TYPE,
// 		payload,
// 	};
// };
export const getGanresData = () => {

	return {
		type: GanresTypes.GET_GANRES_DATA,
	
	};
};
export const setGanres= (payload:any) => {
	return {
		type: GanresTypes.SET_GANRES_DATA,
		payload
	
	};
};

