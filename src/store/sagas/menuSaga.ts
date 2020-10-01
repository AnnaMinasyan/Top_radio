import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData,setActiveIndex, setPlayingData,setFilterData,setHeaderText} from "../actions/menuActions"
import {setPlayItemType} from "../actions/filterAction"
import {changeplayItem,setSwiperData} from "../actions/menuActions"


function* getMenuData() {
	try {
		const data= yield auth.getMenuDatas()
		let swiper =data.slice(0, 15)
		yield put(setMenuData(data))
		yield put(setFilterData(data))
		yield put(setSwiperData(swiper))
		yield put(setActiveIndex(0))
	} catch (ex) {
	}
}
function* changingActiveIndex(num:number) {
	console.log("nuuuuuuum",num);
	
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
}

