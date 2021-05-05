import { ThemeTypes } from '../constants';
interface IReduxAction<T> {
    type: T;
    payload: any;
}
export interface IThemeState {
    backgroundColor: string,
    height:number,
    width:number,
    albomeMode:boolean
}
export const initialState: IThemeState = {
    backgroundColor: 'white',
    height:0,
    width:0,
    albomeMode:false
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
            case ThemeTypes.SET_HEIGHT_WIDTH:
    
                return { ...state, height: action.payload.height,width:action.payload.width,albomeMode:action.payload.albomeMode }
        default:
            return state;
    }
}
export default themeReducer;