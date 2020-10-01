import { ThemeTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IThemeState {
    isFavorite: boolean,
    swipeablePanelActive: boolean | null,
    playItem: any,
    isLooking: boolean,
    backgroundColor: string,
    favorites: any,
    searchData: any,
    isPlayingMusic:boolean

}


export const initialState: IThemeState = {
    isFavorite: false,
    swipeablePanelActive: null,
    playItem: {},
    isLooking: false,
    backgroundColor: 'white',
    favorites: [],
    searchData: '',
    isPlayingMusic:false
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