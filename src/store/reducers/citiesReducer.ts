import { CitiesTypes } from '../constants';

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface ICitiesState {
    styleView: boolean,
    cities:any
}


export const initialState: ICitiesState = {
    styleView: true,
    cities:[]
}
const citiesReducer = (state = initialState, action: IReduxAction<CitiesTypes>) => {
    switch (action.type) {
        
        case CitiesTypes.SET_CITIES_DATA:
            
            return {cities:action.payload} 
        default:
            return state;
    }
}
export default citiesReducer;