import { BottomType } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IBottomState {
    
    playItem: any,
    playingMusicArtistSong:any,
    playMusicData:any
}


export const initialState: IBottomState = {
    playItem: null,
    playingMusicArtistSong:{},
    playMusicData:{}
    
}
const bottomReducer = (state = initialState, action: IReduxAction<BottomType>) => {
    console.log(action.type)
    switch (action.type) {
      
        case BottomType.SET_PLAY_ITEM:
            console.log(Date.now());
            
            return { ...state, playItem: action.payload }
       case BottomType.SET_PLAY_ITEM_ARTIST_SONG:
           
            return { ...state, playingMusicArtistSong: action.payload }
       case BottomType.SET_PLAYING_DATA:
            return { ...state, playMusicData: action.payload }
       

        default:

            return state;
    }
}
export default bottomReducer;