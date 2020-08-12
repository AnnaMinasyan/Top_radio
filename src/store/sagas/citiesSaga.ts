import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CitiesTypes } from '../constants';
import auth from "../../services/api/auth"
import {setCities} from "../actions/citiesAction"



function* getCitiesData() {
	try {
		console.log('saga getCitiesData');

		const data= yield auth.getCities()
		//console.log("dataaaa",data);
		
		yield put(setCities(data))
	} catch (ex) {
		console.log(ex);
	
	}
}

export function* watchCities() {
	yield takeEvery(
		CitiesTypes.GET_CITIES_DATA as any,
		getCitiesData
	)
	
}
