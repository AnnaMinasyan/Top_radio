import {IBottomState} from "../reducers/bottomReducer"
export const playItemSelector = ({ bottomReducer:  {playItem } }: {bottomReducer : IBottomState}) => playItem;
export const selectedRadioStationSelector = ({ bottomReducer:  {selectedRadioStation } }: {bottomReducer : IBottomState}) => selectedRadioStation;