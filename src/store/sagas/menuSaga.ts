import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData, setPlayingData,setFilterData,setHeaderText,
	setInitialRouteName,
	setSearchData} from "../actions/menuActions"
import {setSwiperData,setLookingList} from "../actions/menuActions"

import {setIsConnected  } from "../actions/bottomAction";

function* getMenuData() {
	try {
		let data= yield auth.getMenuDatas()
		
		for (let index = 0; index < data.length; index++) {
			const element = data[index];
			element.index=index
		}
		yield put(setMenuData(data))
		yield put(setFilterData(data))
		yield put(setSearchData(data))

	} catch (ex) {
		yield put(setIsConnected(false))

	}
}
function* changeInitialRouteName({payload}:any) {

	try {
		yield put(setInitialRouteName(payload))
	} catch (ex) {
		console.log(ex);
	}
}
function* changeLookingList({payload}:any) {
	try {
		yield put(setLookingList(payload.reverse()))

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
function* onChangeSwiperData({payload}:any) {
    try {
		yield put(setSwiperData(payload))
	} catch (ex) {
		console.log(ex);
	} 
}
function* onChangeFilterData({payload}:any) {
    try {		
		yield put(setFilterData(payload))
		yield put(setSearchData(payload))

	} catch (ex) {
		console.log(ex);
	} 
}
function* onChangeHeaderText({payload}:any) {
    try {
		yield put(setHeaderText(payload))
	} catch (ex) {
		console.log(ex);
	} 
}
function* changeSearchData({payload}:any) {
    try {		
		yield put(setSearchData(payload))
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
        MenuTypes.CHANGE_PLAYINGDATA as any,
		onChangePlayingData
	)
	yield takeEvery(
        MenuTypes.CHANGE_SWIPER_DATA as any,
		onChangeSwiperData
	)
	yield takeEvery(
        MenuTypes.CHANGE_FILTER_DATA as any,
		onChangeFilterData
	)
	yield takeEvery(
        MenuTypes.CHANGE_HEADERTEXT as any,
		onChangeHeaderText
	)
	yield takeEvery(
		MenuTypes.CHANGE_ACTIVE_INITIALROUTE_NAME as any,
		changeInitialRouteName
	)
	yield takeEvery(
		MenuTypes.CHANGE_LOOKING_LIST as any,
		changeLookingList
	)
	yield takeEvery(
		MenuTypes.CHANGE_SEARCH_DATA as any,
		changeSearchData
	)
}

