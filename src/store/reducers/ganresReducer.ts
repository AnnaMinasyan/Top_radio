import { GanresTypes } from '../constants';

interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IGanresState {
    ganres:any
}


export const initialState: IGanresState = {
    ganres:[]
}
const ganresReducer = (state = initialState, action: IReduxAction<GanresTypes>) => {
    switch (action.type) {
        
        case GanresTypes.SET_GANRES_DATA:
            
            return {ganres:action.payload} 
        default:
            return state;
    }
}
export default ganresReducer;