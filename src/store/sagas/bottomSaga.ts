import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { BottomType } from '../constants';
import auth from "../../services/api/auth"
import {setplayItem,
    setplayItemArtistandSong,
    setPlayingData,
    setActiveIndex,
    setActiveBi
} from "../actions/bottomAction";

import {changePlayingMusic} from "../actions/filterAction"
import player from "../../services/player/PlayerServices"
import { storeData, getData } from "../../utils/local_storage"

function* onGetPlayType({payload}:any) {	
    try {
        yield put(setplayItem(payload))
        yield put(setActiveBi(payload.st[0].bi))	
        const data= yield auth.getPlayItemType(payload.pl)	
      yield put(setplayItemArtistandSong(data.playList[0]))
     const  autoplay =yield getData("autoPlay")
    if (autoplay) {
      yield  put(changePlayingMusic(true))

        console.log("fhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        yield    player._startPlayMusic(payload,data.playList[0])
    }
 
   
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
function* onchangeActiveIndex({payload}:any) {	
    try {

        yield put(setActiveIndex(payload))	
	} catch (ex) {
		console.log(ex);
	}
}
function* onchangeActiveBi({payload}:any) {	
    try {

        yield put(setActiveBi(payload))	
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
    yield takeEvery(
        BottomType.CHANGE_ACTIVE_INDEX as any,
		onchangeActiveIndex
    )
    yield takeEvery(
        BottomType.CHANGE_ACTIVE_BI as any,
		onchangeActiveBi
	)
}

