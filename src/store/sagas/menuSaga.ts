import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData,setPlayList} from "../actions/menuActions"



function* getMenuData() {
	try {
		const data= yield auth.getMenuDatas()
		yield put(setMenuData(data))
	} catch (ex) {
	}
}

export function* watchMenuType() {
	yield takeEvery(
		MenuTypes.GET_MENU_DATA as any,
		getMenuData
	)
	
}

