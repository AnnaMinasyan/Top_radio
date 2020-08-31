import { SettingsType } from "../constants";
interface IReduxAction<T> {
    type: T;
    payload: any;
}
export interface ISettingsState {
   autoPlay:boolean
}


export const initialState: ISettingsState = {
    autoPlay:true
}
const settingsReducer = (state = initialState, action: IReduxAction<SettingsType>) => {
    
    switch (action.type) {
        case SettingsType.SET_AUTO_PLAY:
            return { ...state, autoPlay:action.payload }
       
        default:
            return state;
    }
}
export default settingsReducer;