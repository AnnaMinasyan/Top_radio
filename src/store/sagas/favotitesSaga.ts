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
import {setMenuData,setPlayList} from "../actions/menuActions"
import { favoritesSelector } from '../selector/favorites';
import { setFavorites } from '../actions/favoritesActions';
import { getData, storeData } from '../../utils/local_storage';



function* addToFavorite({payload}:any) {
    const favorites = yield getData('favorites');
    const tmp:number[] = favorites?favorites.map((i:{id:number})=>i.id):[];
    const index = tmp.indexOf(payload.id);
    if(index==-1){
        tmp.push(payload.id);
        favorites.push(payload)
    }else{
        tmp.splice(index,1);
        favorites.splice(index,1);
    }
    yield storeData('favorites',favorites)
    yield put(setFavorites(tmp));

}
function* getFavoritesFromStorage( ) {
    const favorites = yield getData('favorites');
    if(!favorites){
        yield storeData('favorites',[]);
    }
    const tmp:number[] = favorites?favorites.map((i:{id:number})=>i.id):[];
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
	
}

