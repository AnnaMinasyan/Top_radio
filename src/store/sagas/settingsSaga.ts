

import { put,  takeEvery } from 'redux-saga/effects';
import { SettingsType } from '../constants';
import { setAutoPlay, setBufferSize, setIsOnheadsets, setReconnenct } from '../actions/settingsAcrion';
import { getData, storeData } from '../../utils/local_storage';

function* onChangeAutoPlay({ payload }: any) {
    yield storeData('autoPlay', payload);
    yield put(setAutoPlay(payload));

}
function* initAutoPlaybyStorage(): Generator {

    const autoplay: any = yield getData('autoPlay');
    try {
        if (autoplay == null) {
            yield storeData('autoPlay', false);
            yield put(setAutoPlay(false));
        } else {
            yield put(setAutoPlay(autoplay));
        }
    } catch (ex) {

        console.log(ex);
    }
}
function* changingBufferSize(payload: any) {
    try {
        yield put(setBufferSize(payload.payload));
    } catch (error) {

    }
}
function* changeIsOnheadsets(payload: any) {
    try {
        yield put(setIsOnheadsets(payload.payload));
    } catch (error) {

    }
}
function* changeReconnect(payload: any) {
    try {
        yield put(setReconnenct(payload.payload));
    } catch (error) {
    }
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
    yield takeEvery(
        SettingsType.CHANGE_RECONNECT as any,
        changeReconnect
    )
}

