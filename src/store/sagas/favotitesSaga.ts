/**
 * 
 * const newArr = [...state.favorites]
            let storageFavorite: any = []
            const index = newArr.indexOf(action.payload.id);
            if(index==-1){
                newArr.push(action.payload.id)
            }else{
                newArr.splice(index,1);
            }
            return { ...state, favorites: newArr }
 */

import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MenuTypes, FavoriteType } from '../constants';
import auth from "../../services/api/auth"
import { favoritesSelector } from '../selector/favorites';
import { setFavorites } from '../actions/favoritesActions';
import { getData, storeData } from '../../utils/local_storage';

import {setFavoriteList} from "../actions/menuActions"

function* addToFavorite({payload}:any) {
    console.log("::::::payload:::::",payload);
    
    const favorites = yield getData('favorites');
    const tmp:number[] = favorites?.length>0?favorites.map((i:{id:number})=>i.id):[];
    console.log("favorites",favorites);
    
    const index = tmp.indexOf(payload.id);
    if(index==-1){
        
        tmp.push(payload.id);
        favorites.push(payload)
        console.log("111111",favorites);

    }else{
        tmp.splice(index,1);
        favorites.splice(index,1);
        console.log("22222222",favorites);

    }
    yield storeData('favorites',favorites)
    console.log("sagaaaa",favorites);
    
    yield  put(setFavoriteList(favorites))
    
    yield put(setFavorites(tmp));

}
function* getFavoritesFromStorage( ) {
    const favorites = yield getData('favorites');
    console.log("ppppp",favorites);
    
    if(!favorites){        
        yield storeData('favorites',[]);
    }
    const tmp:number[] = favorites?.length>0?favorites.map((i:{id:number})=>i.id):[];
    console.log('tmp',tmp);
    
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
}

