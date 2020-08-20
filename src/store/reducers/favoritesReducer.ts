import { FavoriteType } from "../constants";

interface IReduxAction<T> {
    type: T;
    payload: number[];
}

export const initialState:number[] = []
const favoritesReducer = (state = initialState, action: IReduxAction<FavoriteType>) => {
    switch (action.type) {
        case FavoriteType.SET:
        return  action.payload
        default:
            return state;
    }
}

export default favoritesReducer;