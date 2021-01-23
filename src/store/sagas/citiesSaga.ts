import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CitiesTypes } from '../constants';
import auth from "../../services/api/auth"
import {setCities} from "../actions/citiesAction"
import {setIsConnected  } from "../actions/bottomAction";


function* getCitiesData() {
	try {

		const data= yield auth.getCities()
		//console.log("dataaaa",data);
		var len = data.length;
			for (var i = len-1; i>=0; i--){
			  for(var j = 1; j<=i; j++){
				if(data[j-1].co<data[j].co){
					var temp = data[j-1];
					data[j-1] = data[j];
					data[j] = temp;
				 }
			  }
			}
		yield put(setCities(data))
	} catch (ex) {
		yield put(setIsConnected(false))
		console.log(ex);
	
	}
}

export function* watchCities() {
	yield takeEvery(
		CitiesTypes.GET_CITIES_DATA as any,
		getCitiesData
	)
	
}
