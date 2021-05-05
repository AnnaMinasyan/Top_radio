import { ICitiesState } from '../reducers/citiesReducer';

export const citiesSelector = ({ citiesReducer:  {cities}  }: { citiesReducer: ICitiesState }) => cities;

