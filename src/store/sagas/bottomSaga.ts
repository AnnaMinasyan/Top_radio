import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { BottomType } from '../constants';
import auth from "../../services/api/auth"
import {setplayItem,
    setplayItemArtistandSong,
    setPlayingData
} from "../actions/bottomAction"



function* onGetPlayType({payload}:any) {	
    try {
        const data= yield auth.getPlayItemType(payload.pl)	
      yield put(setplayItemArtistandSong(data.playList[0]))
        yield put(setplayItem(payload))	
	} catch (ex) {
		console.log(ex);
	}
}
function* onChangePlayingData({payload}:any) {	
    try {
       	
        yield put(setPlayingData(payload))	
	} catch (ex) {
		console.log(ex);
	}
}
function* onChangeplayItemArtistandSon({payload}:any) {	
    try {
        const data= yield auth.getPlayItemType(payload.pl)	

        yield put(setplayItemArtistandSong(data.playList[0]))	
	} catch (ex) {
		console.log(ex);
	}
}
export function* watchBottomType() {
	yield takeEvery(
        BottomType.CHANGE_PLAY_ITEM as any,
		onGetPlayType
	)
	yield takeEvery(
        BottomType.CHANGE_PLAYING_DATA as any,
		onChangePlayingData
    )
    yield takeEvery(
        BottomType.CHANGE_PLAY_ITEM_ARTIST_SONG as any,
		onChangeplayItemArtistandSon
	)
}
