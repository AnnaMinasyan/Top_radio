import { IFilterState } from '../reducers/filterReducer';

export const panelActiveSelector = ({ filterReducer }: { filterReducer: IFilterState }) => filterReducer;
export const playItem = ({ filterReducer:  {playItem } }: { filterReducer: IFilterState }) => playItem;
