import { all,call } from 'redux-saga/effects';
import { createDriver } from 'redux-saga-requests-axios';


import { watchMenuType } from './menuSaga';
import { watchCities } from './citiesSaga';
import { watchGanres } from './ganresSaga';
import { watchPlayList } from './playListSaga';
import { watchFavoritesSaga } from './favotitesSaga';


export default function* rootSaga() {
	yield all([
        watchMenuType(),
		watchCities(),
		watchGanres(),
		watchPlayList(),
		watchFavoritesSaga()]
	);
}
