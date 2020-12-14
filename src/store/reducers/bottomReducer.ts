import { BottomType } from '../constants';
import { storeData, getData } from "../../utils/local_storage"

interface IReduxAction<T> {
    type: T;
    payload: any;
}
interface ISelectedRadioStation {
    data: any,
    isPlayingMusic: boolean,
    activeBi: any,
    id: number,
    playingSong: any
}
export interface IBottomState {

    playItem: any,
    playingMusicArtistSong: any,
    playMusicData: any,
    activeIndex: number,
    activeBi: number,
    selectedRadioStation: ISelectedRadioStation | null,
    swiperShowRadiostation: ISelectedRadioStation | null,
    activeArrow:boolean,
    miniScreenData:ISelectedRadioStation | null,
}


export const initialState: IBottomState = {
    playItem: null,
    playingMusicArtistSong: {},
    playMusicData: {},
    activeIndex: 0,
    activeBi: 0,
    selectedRadioStation: null,
    swiperShowRadiostation: null,
    activeArrow:true,
    miniScreenData:null

}
const bottomReducer = (state = initialState, action: IReduxAction<BottomType>) => {

    switch (action.type) {
        case BottomType.SET_SELECTED_RADIOSTATION:
            return { ...state, selectedRadioStation: action.payload, swiperShowRadiostation: action.payload }
        case BottomType.SET_SWIPERSHOW_RADIOSTATION:

            return { ...state, swiperShowRadiostation: action.payload }
        case BottomType.SET_SELECTED_RADIOSTATION_PLAYMUSIC:
            return { ...state, selectedRadioStation: { ...state.selectedRadioStation, isPlayingMusic: action.payload },
                miniScreenData: { ...state.miniScreenData, isPlayingMusic: action.payload }
            }
        case BottomType.SET_SWIPERSHOW_RADIOSTATION_PLAYINGSONG:

            return { ...state, swiperShowRadiostation: { ...state.swiperShowRadiostation, playingSong: action.payload },
                miniScreenData: { ...state.miniScreenData, playingSong: action.payload } }

        case BottomType.SET_SWIPERSHOW_RADIOSTATION_ACTIVEBI:

            return { ...state, selectedRadioStation: { ...state.selectedRadioStation, activeBi: action.payload } }

        case BottomType.SET_ACTIVEARROW:

  return { ...state,  activeArrow:action.payload}
        case BottomType.SET_MINI_SCREENDATA:

            return { ...state,  miniScreenData:action.payload}
        case BottomType.SET_PLAY_ITEM:

            return { ...state, playItem: action.payload, activeBi: action.payload.st[0].bi }
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