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
    favorites: any
}


export const initialState: IMenuState = {
    // styleView: true,
    menuData: [],
    filterData: [],
    playTrackList: [],
    favorites: []
}
const menuReducer = (state = initialState, action: IReduxAction<MenuTypes>) => {
    switch (action.type) {
        case MenuTypes.SET_MENU_DATA:
            let arraymenu = action.payload
            for (let index = 0; index < arraymenu.length; index++) {
                const element = arraymenu[index];
                element.isfavorite = false
            }
            return { ...state, menuData: arraymenu }
        case MenuTypes.CHANGE_FAVORITE:
            console.log("action.payload", action.payload);
            let menu = state.menuData
            for (let index = 0; index < menu.length; index++) {
                const element = menu[index];
                if (element.id == action.payload.id) {
                    element.isfavorite = !element.isfavorite
                }

            }

            //  let arr=state.menuData
            // // arr[action.payload].isfavorite=!arr[action.payload].isfavorite
            // // // for (let index = 0; index <arraymenu.length; index++) {
            // // //     const element = arraymenu[index];
            // // //     element.isfavorite=false
            // // // }
            return { ...state, menuData: menu }
        case MenuTypes.CHANGE_FILTER_DATA:
            const array: any = []
            for (let index = 0; index < state.menuData.length; index++) {
                const element = state.menuData[index];
              
                if (element.ci && element.ci.length > 0) {
                  
                    element.ci.map((elem: any, key: any) => {
                        console.log(elem, action.payload);
                        if (elem.na == action.payload) {
                            array.push(element)
                        }
                    })
                }else if (element.ci== action.payload) {

                    array.push(element)

                }
            }

            return { ...state, filterData: array }
        case MenuTypes.CHANGE_FILTER_DATA_BY_GENRE:
            const genre: any = []
            for (let index = 0; index < state.menuData.length; index++) {
                const element = state.menuData[index];
                if (element.ge && element.ge.length > 0) {
                    element.ge.map((elem: any, key: any) => {
                        console.log(elem, action.payload);
                        if (elem.id == action.payload) {
                            genre.push(element)
                        }
                    })
                }
            }
            return { ...state, filterData: genre }

        default:

            return state;
    }
}
export default menuReducer;