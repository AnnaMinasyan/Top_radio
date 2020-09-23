import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData,setActiveIndex, setPlayingData} from "../actions/menuActions"
import {setPlayItemType} from "../actions/filterAction"
import {changeplayItem} from "../actions/menuActions"


function* getMenuData() {
	try {
		const data= yield auth.getMenuDatas()
		yield put(changeplayItem(data[0]))
		yield put(setPlayingData(data[0]))
		yield put(setMenuData(data))
	} catch (ex) {
	}
}
function* changingActiveIndex(num:number) {
	
	try {
		yield put(setActiveIndex(num))
	} catch (ex) {
	}
}
function* onGetPlayType({payload}:any) {
    console.log(payload);
	
    try {
        const data= yield auth.getPlayItemType(payload.pl)
		yield put(setPlayItemType(data.playList[0]))
	} catch (ex) {
		console.log(ex);
	
	}
    
}
function* onChangePlayingData({payload}:any) {
    
    try {
        console.log("icen uruhgtpegeoe",payload);
		
		yield put(setPlayingData(payload))
	} catch (ex) {
		console.log(ex);
	
	}
    
}
export function* watchMenuType() {
	yield takeEvery(
		MenuTypes.GET_MENU_DATA as any,
		getMenuData
	)
	yield takeEvery(
		MenuTypes.CHANGE_ACTIVE_INDEX as any,
		changingActiveIndex
	)
	yield takeEvery(
        MenuTypes.CHANGE_PLAY_ITEM as any,
		onGetPlayType
	)
	yield takeEvery(
        MenuTypes.CHANGE_PLAYINGDATA as any,
		onChangePlayingData
	)
}

