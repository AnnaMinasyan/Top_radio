

import { put,  takeEvery } from 'redux-saga/effects';
import {  FilterTypes } from '../constants';
import { setMenuType} from '../actions/filterAction';
import { getData, storeData } from '../../utils/local_storage';
function* onGetMenuType({payload}:any):Generator {
    try {
        yield storeData('menuType',payload);
    yield put(setMenuType(payload));
      } catch (ex) {
        console.log('errror',ex);
      }
}
function* initMenuTypebyStorage():Generator {  
    const menuType:any = yield getData('menuType');
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

