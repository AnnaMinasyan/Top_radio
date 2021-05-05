
import { put, takeEvery } from 'redux-saga/effects';
import { FavoriteType } from '../constants';
import { setFavorites } from '../actions/favoritesActions';
import { getData, storeData } from '../../utils/local_storage';

import {setFavoriteList, setFilterData, setSearchData} from "../actions/menuActions"
function* deleteIsFavorites({payload}:any):Generator {
    const favorites:any = yield getData('favorites');
    const tmp:number[] = favorites?.length>0?favorites.map((i:{id:number})=>i.id):[];
    const index = tmp.indexOf(payload.id);
    if(index==-1){
        tmp.push(payload.id);
        favorites.push(payload)

    }else{
        tmp.splice(index,1);
        favorites.splice(index,1);

    }
    yield storeData('favorites',favorites)
    yield put(setFilterData(favorites))
		yield put(setSearchData(favorites))
    yield  put(setFavoriteList(favorites))
    
    yield put(setFavorites(tmp));

}
function* addToFavorite({payload}:any):Generator {
 
    const favorites:any = yield getData('favorites');
    const tmp:number[] = favorites?.length>0?favorites.map((i:{id:number})=>i.id):[];
    
    const index = tmp.indexOf(payload.id);
    if(index==-1){
        
        tmp.push(payload.id);
        favorites.push(payload)

    }else{
        tmp.splice(index,1);
        favorites.splice(index,1);
    }
    yield storeData('favorites',favorites)
    yield  put(setFavoriteList(favorites))
    
    yield put(setFavorites(tmp));

}
function* getFavoritesFromStorage( ):Generator {
    const favorites:any = yield getData('favorites');
    if(!favorites){        
        yield storeData('favorites',[]);
    }
    const tmp:number[] = favorites?.length>0?favorites.map((i:{id:number})=>i.id):[];    
    yield put(setFavorites(tmp));
}
function* createApp( {payload}:any) {
    const tmp:number[] = payload?.length>0?payload.map((i:{id:number})=>i.id):[];
    const index = tmp.indexOf(payload.id);
    if(index==-1){
        tmp.push(payload.id);
    }else{
        tmp.splice(index,1);
    }
    yield  put(setFavoriteList(payload))
    yield put(setFavorites(tmp));
}
export function* watchFavoritesSaga() {
	yield takeEvery(
		FavoriteType.ADD as any,
		addToFavorite
    )
    yield takeEvery(
		FavoriteType.INIT as any,
		getFavoritesFromStorage
	)
	  yield takeEvery(
		FavoriteType.APP_CREATE as any,
		createApp
	)
    yield takeEvery(
		FavoriteType.DELET_IS_FAVORITE as any,
		deleteIsFavorites
	)
}

