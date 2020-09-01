

import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import {  FilterTypes } from '../constants';
import {  getMenuType,setMenuType,setPlayItemType} from '../actions/filterAction';
import { getData, storeData } from '../../utils/local_storage';
import auth from "../../services/api/auth"

function* onGetMenuType({payload}:any) {
    yield storeData('menuType',payload);
    yield put(setMenuType(payload));
   
}
function* initMenuTypebyStorage() {
    
    const menuType = yield getData('menuType');

    if(menuType==null){        
        yield storeData('menuType',1);
        yield put(setMenuType(1));
    }else{
        yield put(setMenuType(menuType));
    }
    
}
function* onGetPlayType({payload}:any) {
    console.log(payload.pl);
    
    try {
        const data= yield auth.getPlayItemType(payload.pl)
		//console.log("dataaaa",data);
		
		yield put(setPlayItemType(data.playList[0]))
	} catch (ex) {
		console.log(ex);
	
	}
    
}
export function* watchFilterSaga() {
    yield takeEvery(
        FilterTypes.INIT_MENU_TYPE as any,
		initMenuTypebyStorage
    )
    yield takeEvery(
        FilterTypes.GET_MENU_TYPE as any,
		onGetMenuType
    )
    yield takeEvery(
        FilterTypes.CHANGE_PLAY_ITEM as any,
		onGetPlayType
	)
}

