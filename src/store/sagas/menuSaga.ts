import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData} from "../actions/menuActions"



function* getMenuData() {
	try {
		console.log('saga ==============getMenuData');

		const data= yield auth.getMenuDatas()
		//console.log("dataaaa",data);
		
		yield put(setMenuData(data))
	} catch (ex) {
		console.log(ex);
	
	}
}
function* getPlayReackList(payload:any) {
	try {

		const data= yield auth.getPlayReackLists(payload)
		
		yield put(setMenuData(data))
	} catch (ex) {
		console.log(ex);
	
	}
}
export function* watchMenuType() {
	yield takeEvery(
		MenuTypes.GET_MENU_DATA as any,
		getMenuData
	)
	
}
export function* watchPlayTeackLists() {
	yield takeEvery(
		MenuTypes.GET_PLAY_TRACK_LIST as any,
		getPlayReackList
	)
	
}
