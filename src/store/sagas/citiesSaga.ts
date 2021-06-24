import { put,  takeEvery } from 'redux-saga/effects';
import { CitiesTypes } from '../constants';
import auth from "../../services/api/auth"
import {setCities,setFilterCities} from "../actions/citiesAction"
import {setIsConnected  } from "../actions/bottomAction";
function* getCitiesData():Generator{
	try {
		const data:any= yield auth.getCities()
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
		//console.log(ex);
	}
}
function* changeFilterCities({payload}:any) {
	try {
		yield put(setFilterCities(payload))
	} catch (ex) {
		yield put(setIsConnected(false))
		//console.log(ex);
	}
}
export function* watchCities() {
	yield takeEvery(
		CitiesTypes.GET_CITIES_DATA as any,
		getCitiesData
	)
	yield takeEvery(
		CitiesTypes.CHANGE_FILTER_CITIES_DATA as any,
		changeFilterCities
	)
}
