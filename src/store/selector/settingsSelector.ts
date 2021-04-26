import { ISettingsState } from '../reducers/settingsReducer';

export const isOnheadsetsSelector = ({ settingsReducer:  {isOnheadsets } }: { settingsReducer: ISettingsState }) => isOnheadsets;
export const reconnectSelector = ({ settingsReducer:  {reconnect } }: { settingsReducer: ISettingsState }) => reconnect;
