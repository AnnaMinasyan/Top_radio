import { IMenuState } from '../reducers/menuReducer';

export const playItemSelector = ({ menuReducer:  {playItem } }: { menuReducer: IMenuState }) => playItem;
export const filterDataSelector = ({ menuReducer:   {filterData} }: { menuReducer: IMenuState }) => filterData;
export const activeIndexSelector = ({ menuReducer:   {activeIndex} }: { menuReducer: IMenuState }) => activeIndex;
