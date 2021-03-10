import { CitiesTypes } from '../constants';

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface ICitiesState {
    styleView: boolean,
    cities:any,
    filterCities:any
}


export const initialState: ICitiesState = {
    styleView: true,
    cities:null,
    filterCities:[]
}
const citiesReducer = (state = initialState, action: IReduxAction<CitiesTypes>) => {
    switch (action.type) {
        case CitiesTypes.SET_CITIES_DATA:
            return {...state,cities:action.payload,filterCities:action.payload} 
            case CitiesTypes.SET_FILTER_CITIES_DATA:
                return {...state,filterCities:action.payload} 
        default:
            return state;
    }
}
export default citiesReducer;