import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { GanresTypes } from '../constants';
import auth from "../../services/api/auth"
import {setGanres} from "../actions/ganresAction"



function* getGanresData() {
	try {
		console.log('saga getCitiesData');

		const data= yield auth.getGanres()
		//console.log("dataaaa",data);
		
		yield put(setGanres(data))
	} catch (ex) {
		console.log(ex);
	
	}
}

export function* watchGanres() {
	yield takeEvery(
		GanresTypes.GET_GANRES_DATA as any,
		getGanresData
	)
	
}
