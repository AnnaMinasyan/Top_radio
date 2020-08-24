import { ThemeTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IFilterState {
    isFavorite: boolean,
    swipeablePanelActive: boolean | null,
    playItem: any,
    isLooking: boolean,
    backgroundColor: string,
    favorites: any,
    searchData: any,
    isPlayingMusic:boolean

}


export const initialState: IFilterState = {
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
            console.log(action.payload, color);

            return { ...state, backgroundColor: color }
        default:
            return state;
    }
}
export default themeReducer;