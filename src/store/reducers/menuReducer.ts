import { MenuTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IMenuState {
    // styleView: boolean,
    menuData: any,
    filterData: any,
    playTrackList: any,
    favorites: any,
    activeIndex:number,
    swipeList:any,
    playItem:any,
    playMusicData:any
}


export const initialState: IMenuState = {
    playItem: {},
    menuData: [],
    filterData: [],
    playTrackList: [],
    favorites: [],
    activeIndex:0,
    swipeList:[],
    playMusicData:{}
}
const menuReducer = (state = initialState, action: IReduxAction<MenuTypes>) => {
    switch (action.type) {
        case MenuTypes.SET_MENU_DATA:
            let arraymenu = action.payload
            let swip=[]
            for (let index = 0; index < 3; index++) {
               
                if (index>=0) {
                 const element = action.payload[index];   
                   swip.push(element)
                }
            
            }
            return { ...state, menuData: arraymenu,swipeList:swip }
        case MenuTypes.SET_ACTIVE_INDEX:
            let swipers=[]
           
            for (let index =0; index < action.payload.payload+3; index++) {
               
              //  if (index>=0) {
                 const element = state.menuData[index];   
                    swipers.push(element)
               // }
            
            }
            
            return { ...state, activeIndex: action.payload.payload ,swipeList:swipers}
            case MenuTypes.CHANGE_PLAY_ITEM:
                return { ...state, playItem: action.payload }
        case MenuTypes.CHANGE_FAVORITE:
            console.log("action.payload", action.payload);
            let menu = state.menuData
            for (let index = 0; index < menu.length; index++) {
                const element = menu[index];
                if (element.id == action.payload.id) {
                    element.isfavorite = !element.isfavorite
                }

            }
            return { ...state, menuData: menu }
        case MenuTypes.CHANGE_FILTER_DATA:
            const array: any = []
            console.log(action.payload);
            for (let index = 0; index < state.menuData.length; index++) {
                const element = state.menuData[index];
                if (element.ci && element.ci.length > 0) {
                    element.ci.map((elem: any, key: any) => {
                        if (elem == action.payload) {
                            array.push(element)
                        }
                    })
                }
            }
            return { ...state, filterData: array }
        case MenuTypes.CHANGE_FILTER_DATA_BY_GENRE:
            const genre: any = []
            console.log(state.menuData[0]);
            
            for (let index = 0; index < state.menuData.length; index++) {
                const element = state.menuData[index];
                if (element.ge && element.ge.length > 0) {
                    element.ge.map((elem: any, key: any) => {
                        if (elem == action.payload) {
                            genre.push(element)
                        }
                    })
                }
            }
            
            return { ...state, filterData: genre }
            case MenuTypes.SET_PLAYINGDATA:
               console.log( action.payload);
               
                return { ...state, playMusicData: action.payload }
        default:

            return state;
    }
}
export default menuReducer;