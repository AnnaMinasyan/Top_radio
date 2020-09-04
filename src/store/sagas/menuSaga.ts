import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData,setActiveIndex} from "../actions/menuActions"
import {changeplayItem} from "../actions/filterAction"


function* getMenuData() {
	try {
		const data= yield auth.getMenuDatas()
		yield put(changeplayItem(data[0]))
		yield put(setMenuData(data))
	} catch (ex) {
	}
}
function* changingActiveIndex(num:number) {
	console.log(":::::::::::::::",num);
	
	try {
		yield put(setActiveIndex(num))
	} catch (ex) {
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
}

