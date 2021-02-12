import {IBottomState} from "../reducers/bottomReducer"
export const playItemSelector = ({ bottomReducer:  {playItem } }: {bottomReducer : IBottomState}) => playItem;
export const selectedRadioStationSelector = ({ bottomReducer:  {selectedRadioStation } }: {bottomReducer : IBottomState}) => selectedRadioStation;
export const swiperShowRadiostationSelector = ({ bottomReducer:  {swiperShowRadiostation } }: {bottomReducer : IBottomState}) => swiperShowRadiostation;
export const isConnectedSelector = ({ bottomReducer:  {isConnected } }: {bottomReducer : IBottomState}) => isConnected;
export const alarmClockRadioStationSelector = ({ bottomReducer:  {alarmClockRadioStation } }: {bottomReducer : IBottomState}) => alarmClockRadioStation;
