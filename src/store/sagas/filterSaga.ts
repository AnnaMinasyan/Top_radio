

import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import {  FilterTypes } from '../constants';
import {  getMenuType,setMenuType,setPlayItemType} from '../actions/filterAction';
import { getData, storeData } from '../../utils/local_storage';
import auth from "../../services/api/auth"

function* onGetMenuType({payload}:any) {
    try {
        yield storeData('menuType',payload);
    yield put(setMenuType(payload));
      } catch (ex) {
        console.log('errror',ex);
      }
   
   
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

export function* watchFilterSaga() {
    yield takeEvery(
        FilterTypes.INIT_MENU_TYPE as any,
		initMenuTypebyStorage
    )
    yield takeEvery(
        FilterTypes.GET_MENU_TYPE as any,
		onGetMenuType
    )
   
}

