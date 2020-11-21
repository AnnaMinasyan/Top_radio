import { ThemeTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}
export interface IThemeState {
    backgroundColor: string,
}
export const initialState: IThemeState = {
    backgroundColor: 'white',
   
}
const themeReducer = (state = initialState, action: IReduxAction<ThemeTypes>) => {
    switch (action.type) {

        case ThemeTypes.CHANGE_BACKGROUNDCOLOR:
            let color = ''
            if (action.payload) {
                color = "#0D1834"
            } else {
                color = "white"
            }

            return { ...state, backgroundColor: color }
        default:
            return state;
    }
}
export default themeReducer;