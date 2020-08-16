import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { PlayListTypes } from '../constants';
import auth from "../../services/api/auth"
import {setPlayList} from "../actions/playlistAction"



function* getPlayListData(payload:number) {
	try {
		console.log('saga PlayListTypes');

		const data= yield auth.getPlayLists(payload)
		yield put(setPlayList(data))
	} catch (ex) {
		console.log(ex);
	
	}
}

export function* watchPlayList() {
	yield takeEvery(
		PlayListTypes.GET_PLAY_LIST as any,
		getPlayListData
	)
	
}
