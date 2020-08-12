import { all,call } from 'redux-saga/effects';
import { createDriver } from 'redux-saga-requests-axios';


import { watchMenuType,watchPlayTeackLists } from './menuSaga';
import { watchCities } from './citiesSaga';
import { watchGanres } from './ganresSaga';



export default function* rootSaga() {
	yield all([
        watchMenuType(),
		watchCities(),
		watchGanres(),
		watchPlayTeackLists()]
	);
}
