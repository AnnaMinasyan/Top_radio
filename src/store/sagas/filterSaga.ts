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
import { MenuTypes, FavoriteType, FilterTypes } from '../constants';
import auth from "../../services/api/auth"
import {setMenuData,setPlayList} from "../actions/menuActions"
import { favoritesSelector } from '../selector/favorites';
import { setFavorites } from '../actions/favoritesActions';
import { getData, storeData } from '../../utils/local_storage';




function* changePlayngMusic( tmp:any) {
    // const favorites = yield getData('favorites');
    // if(!favorites){
    //     yield storeData('favorites',[]);
    // }
    // const tmp:number[] = favorites?favorites.map((i:{id:number})=>i.id):[];
   // const tmp= yield
    yield put(changePlayngMusic(tmp));

}

export function* watchFavoritesSaga() {
	
    yield takeEvery(
		FilterTypes.CHANGE_PLAYING_MUSIC as any,
		changePlayngMusic
	)
	
}

