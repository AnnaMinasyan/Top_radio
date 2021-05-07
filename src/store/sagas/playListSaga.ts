import { put, takeEvery } from 'redux-saga/effects';
import { PlayListTypes } from '../constants';
import auth from "../../services/api/auth"
import { setPlayList, setTrackList, setHeaderText, setSwiperListType } from "../actions/playlistAction"
function* getPlayListData({payload}: any): Generator {
	try {
		yield put(setHeaderText(payload.pa))
		yield put(setPlayList(undefined))
		const data: any = yield auth.getPlayLists(payload.pl)
	
		yield put(setPlayList(data))
	} catch (ex) {
		console.log(ex);
	}
}
function* getTrackListData({payload}: any): Generator {
	try {
		yield put(setHeaderText(payload.pa))
		yield put(setPlayList(undefined))
		const data: any = yield auth.getTrackLists(payload.pl)
	
		yield put(setPlayList(data))
	} catch (ex) {
		console.log(ex);
	}
}
function* changeSwiperListType({ payload }: any) {
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
	yield takeEvery(
		PlayListTypes.GET_TRACK_LIST as any,
		getTrackListData
	)
}
