import { FilterTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IFilterState {
    isFavorite: boolean,
    swipeablePanelActive: boolean | null,
    playItem: any,
    isActive: string,
    backgroundColor: string,
    favorites: any,
    searchData: any ,
    isPlayingMusic:boolean
    menuType:number,
    playListType:any
}


export const initialState: IFilterState = {
    isFavorite: false,
    swipeablePanelActive: null,
    playItem: {},
    isActive: "all",
    backgroundColor: 'white',
    favorites: [],
    searchData: '',
    isPlayingMusic:false,
    menuType:0,
    playListType:{}
}
const filterReducer = (state = initialState, action: IReduxAction<FilterTypes>) => {
    
    switch (action.type) {
        case FilterTypes.SET_MENU_TYPE:
            return { ...state, menuType: action.payload }
        case FilterTypes.CHANGE_IS_FAVORITE:
            return { ...state, isFavorite: !state.isFavorite }
        case FilterTypes.CHANGE_IS_ACTIVE:
           
            return { ...state, isActive:  action.payload  }
        case FilterTypes.CHANGE_SHEARCH_DATA:
            return { ...state, searchData: action.payload }



        default:
            return state;
    }
}
export default filterReducer;