

import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import {  SettingsType } from '../constants';
import {  setAutoPlay,setBufferSize,setIsOnheadsets} from '../actions/settingsAcrion';
import { getData, storeData } from '../../utils/local_storage';

function* onChangeAutoPlay({payload}:any) {
    yield storeData('autoPlay',payload);
    yield put(setAutoPlay(payload));
   
}
function* initAutoPlaybyStorage() {
    
    const autoplay = yield getData('autoPlay');

    if(autoplay==null){        
        yield storeData('autoPlay',false);
        yield put(setAutoPlay(false));
    }else{
        yield put(setAutoPlay(autoplay));
    }
    
}
function* changingBufferSize(payload:any) {
    
        yield put(setBufferSize(payload.payload));
    
    
}
function* changeIsOnheadsets(payload:any) {
    
        yield put(setIsOnheadsets(payload.payload));
    
    
}
export function* watchSettingsSaga() {
    yield takeEvery(
        SettingsType.INIT_AUTO_PLA as any,
		initAutoPlaybyStorage
    )
    yield takeEvery(
        SettingsType.CHANGE_AUTO_PLAY as any,
		onChangeAutoPlay
    )
    yield takeEvery(
        SettingsType.CHANGE_BUFFER_SIZE as any,
		changingBufferSize
    )
    yield takeEvery(
        SettingsType.CHANGE_IS_ON_HEADSES as any,
		changeIsOnheadsets
	)
}

