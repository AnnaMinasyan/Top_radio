import { MenuTypes } from '../constants';

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IMenuState {
    styleView: boolean,
    menuData:any,
    filterData:any,
    playTrackList:any
}


export const initialState: IMenuState = {
    styleView: true,
    menuData:[],
    filterData:[],
    playTrackList:[]
}
const menuReducer = (state = initialState, action: IReduxAction<MenuTypes>) => {
    switch (action.type) {
        case MenuTypes.CHANGE_MENU_TYPE:
            return {...state, styleView: action.payload };
        case MenuTypes.GET_PLAY_TRACK_LIST:
            return {...state, playTrackList: action.payload };
        case MenuTypes.SET_MENU_DATA:
            return {...state,menuData:action.payload}
        case MenuTypes.CHANGE_FILTER_DATA:
            const array:any=[]
        for (let index = 0; index < state.menuData.length; index++) {
            const element = state.menuData[index];
            if (element.ci && element.ci.length>0) {
                element.ci.map((elem:any, key:any)=>{
                if(elem.id==action.payload){
                array.push(element)  
                }  
                })
            } 
        }
            return {...state,filterData:array} 
             
        default:
            
            return state;
    }
}
export default menuReducer;