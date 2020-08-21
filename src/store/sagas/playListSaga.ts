import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { PlayListTypes } from '../constants';
import auth from "../../services/api/auth"
import {setPlayList,setTrackList} from "../actions/playlistAction"



function* getPlayListData(payload:number) {
	try {
		

		const data= yield auth.getPlayLists(payload)
		console.log('saga PlayListTypes',data);
		yield put(setPlayList(data.playList))
		yield put(setTrackList(data.trackList))
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
