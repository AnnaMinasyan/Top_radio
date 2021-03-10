import { GanresTypes } from "../constants";

interface IReduxAction<T> {
  type: T;
  payload: any;
}

export interface IGanresState {
  ganres: any;
  filterGenre: any;
}

export const initialState: IGanresState = {
  ganres: [],
  filterGenre: [],
};
const ganresReducer = (
  state = initialState,
  action: IReduxAction<GanresTypes>
) => {
  switch (action.type) {
    case GanresTypes.SET_GANRES_DATA:
      console.log('//////////////////');
      
      return { ...state, ganres: action.payload, filterGenre: action.payload };
    case GanresTypes.SET_FILTER_GANRE:
      return {...state,  filterGenre: action.payload };
    default:
      return state;
  }
};
export default ganresReducer;
