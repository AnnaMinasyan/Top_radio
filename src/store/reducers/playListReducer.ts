import { PlayListTypes } from '../constants';

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IPlayListState {
    playList:any,
    trackList:any,
    title:string
}


export const initialState: IPlayListState = {
   
    playList:null,
    trackList:null,
    title:""
}
const playListReducer = (state = initialState, action: IReduxAction<PlayListTypes>) => {
    switch (action.type) {
        case PlayListTypes.SET_PLAY_LIST:
            
            return {...state, playList: action.payload };
        case PlayListTypes.SET_TRACK_LIST:
            
            return {...state, trackList: action.payload };
             case PlayListTypes.SET_HEADER_TEXT:
            
            return {...state, title: action.payload };
        default: 
            return state;
    }
}
export default playListReducer;