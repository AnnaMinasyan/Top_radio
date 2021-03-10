import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { GanresTypes } from '../constants';
import auth from "../../services/api/auth"
import {setFilterGanres, setGanres} from "../actions/ganresAction"
import {setIsConnected  } from "../actions/bottomAction";



function* getGanresData() {
	try {

		const data= yield auth.getGanres()
		
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
		yield put(setGanres(data))
	} catch (ex) {
		yield put(setIsConnected(false))

		console.log(ex);
	
	}
}
function* changeFilerGenre({payload}:any) {
	try {
		console.log('payload',payload);
		
	yield put(setFilterGanres(payload))
	} catch (ex) {
		yield put(setIsConnected(false))
		console.log(ex);
	}
}
export function* watchGanres() {
	yield takeEvery(
		GanresTypes.GET_GANRES_DATA as any,
		getGanresData
	)
	
	yield takeEvery(
		GanresTypes.CHANGE_FILTER_GANRE as any,
		changeFilerGenre
	)
}
