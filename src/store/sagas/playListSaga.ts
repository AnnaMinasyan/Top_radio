import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { PlayListTypes } from '../constants';
import auth from "../../services/api/auth"
import {setPlayList,setTrackList,setHeaderText} from "../actions/playlistAction"
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
		yield put(setIsConnected(false))

		console.log(ex);
	
	}
}

export function* watchPlayList() {
	yield takeEvery(
		PlayListTypes.GET_PLAY_LIST as any,
		getPlayListData
	)
	
}
