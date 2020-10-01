import { MenuTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IMenuState {
    // styleView: boolean,
    menuData: any | null,
    filterData: any,
    playTrackList: any,
    favorites: any,
    activeIndex: number,
    swipeList: any,
    playItem: any,
    playMusicData: any,
    headertext: string
}


export const initialState: IMenuState = {
    playItem: {},
    menuData: null,
    filterData: [],
    playTrackList: [],
    favorites: [],
    activeIndex: 0,
    swipeList: [],
    playMusicData: {},
    headertext: ""
}
const menuReducer = (state = initialState, action: IReduxAction<MenuTypes>) => {

    switch (action.type) {

        case MenuTypes.SET_MENU_DATA:
            return { ...state, menuData: action.payload }
        case MenuTypes.SET_FILTER_DATA:
            return { ...state, filterData: action.payload }

        case MenuTypes.SET_ACTIVE_INDEX:
            return { ...state, activeIndex: action.payload.payload }
        case MenuTypes.CHANGE_PLAY_ITEM:
            return { ...state, playItem: action.payload }
        case MenuTypes.SET_SWIPER_DATA:
            return { ...state, swipeList: action.payload }
        case MenuTypes.SET_PLAYINGDATA:
            return { ...state, playMusicData: action.payload }
        case MenuTypes.SET_HEADERTEXT:
            return { ...state, headertext: action.payload }

        default:

            return state;
    }
}
export default menuReducer;