import { FilterTypes } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IFilterState {
    isFavorite:boolean,
    swipeablePanelActive:boolean | null,
    playItem:any,
    isLooking:boolean,
    backgroundColor:string,
    favorites:any
}


export const initialState: IFilterState = {
    isFavorite:false,
    swipeablePanelActive:null,
    playItem:{},
    isLooking:false,
    backgroundColor:'white',
    favorites:[]
}
const filterReducer = (state = initialState, action: IReduxAction<FilterTypes>) => {
    switch (action.type) {
        
        case FilterTypes.CHANGE_IS_FAVORITE:
            
            return {... state,isFavorite:!state.isFavorite} 
        case FilterTypes.CHANGE_IS_LOOKING:
            
            return {... state,isLooking:!state.isLooking} 
        case FilterTypes.CHANGE_SWIPEABLEPANELACTIVE:
            console.log("action.payload",action.payload);
            
            return {... state,swipeablePanelActive:action.payload} 
        case FilterTypes.CHANGE_PLAY_ITEM:
            return {... state,playItem:action.payload} 
         case FilterTypes.CHANGE_BACKGROUNDCOLOR:
             let color=''
             if (action.payload) {
                 color="#0D1834"
             } else {
                 color="white"
             }
             console.log(action.payload, color);
             
            return {... state,backgroundColor:color}  
            case FilterTypes.GET_FAVORITES:
                return {...state, favorites: action.payload };
            case FilterTypes.ADD_FAVORITE:
                const newArr=state.favorites
                    let count = false
                    if (state.favorites && state.favorites.length > 0) {
                        for (let index = 0; index < newArr.length; index++) {
                            const element = newArr[index];
                            if (element.id == action.payload.id) {
                                count = true
                            }
                            if (count) {
                                newArr.splice(index, 1)
                                break
                            }
                        }
                        if (count == false) {
                            newArr.push(action.payload)
                        }
                    } else {
                        newArr.push(action.payload)
                    }
                    console.log("favorite", newArr);
        
                    storeData("favorites", newArr).then(() => {
                        console.log('reducer',newArr);
                        
                        return {...state, favorites:newArr };
                    })
                
                
        default:
            return state;
    }
}
export default filterReducer;