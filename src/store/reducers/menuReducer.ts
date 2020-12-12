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
    swipeList: any,
    playItem: any,
    playMusicData: any,
    headertext: string,
    activeInitialRouteName:string
    lookingList:any
}


export const initialState: IMenuState = {
    playItem: {},
    menuData: null,
    filterData: [],
    playTrackList: [],
    favorites: [],
    swipeList: [],
    playMusicData: {},
    headertext: "",
    activeInitialRouteName:'Menu',
    lookingList:[]
}
const menuReducer = (state = initialState, action: IReduxAction<MenuTypes>) => {

    switch (action.type) {
        case MenuTypes.SET_ACTIVE_INITIALROUTE_NAME:
            return { ...state, activeInitialRouteName: action.payload }
        case MenuTypes.SET_MENU_DATA:
            return { ...state, menuData: action.payload }
        case MenuTypes.SET_FILTER_DATA:
            return { ...state, filterData: action.payload }
        case MenuTypes.SET_SWIPER_DATA:
            return { ...state, swipeList: action.payload }
        case MenuTypes.SET_PLAYINGDATA:
            return { ...state, playMusicData: action.payload }
        case MenuTypes.SET_HEADERTEXT:
            return { ...state, headertext: action.payload }
        case MenuTypes.SET_LOOKING_LIST:
            return { ...state, lookingList: action.payload }
        default:

            return state;
    }
}
export default menuReducer;