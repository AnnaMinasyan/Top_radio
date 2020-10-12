import { BottomType } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IBottomState {

    playItem: any,
    playingMusicArtistSong: any,
    playMusicData: any,
    activeIndex: number,
    activeBi:number
}


export const initialState: IBottomState = {
    playItem: null,
    playingMusicArtistSong: {},
    playMusicData: {},
    activeIndex: 0,
    activeBi:0

}
const bottomReducer = (state = initialState, action: IReduxAction<BottomType>) => {
   // console.log(action.type)
    switch (action.type) {

        case BottomType.SET_PLAY_ITEM:
            console.log(Date.now());

            return { ...state, playItem: action.payload,activeBi:action.payload.st[0].bi }
        case BottomType.SET_PLAY_ITEM_ARTIST_SONG:

            return { ...state, playingMusicArtistSong: action.payload }
        case BottomType.SET_PLAYING_DATA:
            return { ...state, playMusicData: action.payload }

        case BottomType.SET_ACTIVE_INDEX:
            return { ...state, activeIndex: action.payload }
            case BottomType.SET_ACTIVE_BI:
                return { ...state, activeBi: action.payload }
    
        default:

            return state;
    }
}
export default bottomReducer;