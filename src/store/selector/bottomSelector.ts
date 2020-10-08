import {IBottomState} from "../reducers/bottomReducer"
export const playItemSelector = ({ bottomReducer:  {playItem } }: {bottomReducer : IBottomState}) => playItem;
