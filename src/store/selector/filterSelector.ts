import { IFilterState } from '../reducers/filterReducer';

export const playItemSelector = ({ filterReducer:  {playItem } }: { filterReducer: IFilterState }) => playItem;
export const playListTypeSelector = ({ filterReducer:  {playListType}  }: { filterReducer: IFilterState }) => playListType;
export const isPlayingMusicSelector = ({ filterReducer: isPlayingMusic }: { filterReducer: IFilterState }) => isPlayingMusic;
export const swipeablePanelActiveSelector = ({ filterReducer: {swipeablePanelActive} }: { filterReducer: IFilterState }) => swipeablePanelActive;
