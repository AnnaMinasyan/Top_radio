import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { PlayListTypes } from '../constants';
import auth from "../../services/api/auth"
import {setPlayList,setTrackList,setHeaderText, setSwiperListType} from "../actions/playlistAction"
import {setIsConnected  } from "../actions/bottomAction";



function* getPlayListData(payload:any) {
	try {
		yield put(setHeaderText(payload.payload.pa))
		yield put(setPlayList(null))
		yield put(setTrackList(null))
		const data= yield auth.getPlayLists(payload.payload.pl)

		yield put(setPlayList(data.playList))
		yield put(setTrackList(data.trackList))
	} catch (ex) {

		console.log(ex);
	
	}
}
function* changeSwiperListType({payload}:any) {
	try {
	yield put(setSwiperListType(payload))
	} catch (ex) {

		console.log(ex);
	
	}
}
export function* watchPlayList() {
	yield takeEvery(
		PlayListTypes.GET_PLAY_LIST as any,
		getPlayListData
	)
	yield takeEvery(
		PlayListTypes.CHANGE_SWIPER_LIST_TYPE as any,
		changeSwiperListType
	)
}
