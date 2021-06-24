import { SettingsType } from "../constants";
interface IReduxAction<T> {
  type: T;
  payload: any;
}
export interface ISettingsState {
  autoPlay: boolean,
  bufferSize: IBufferSizeType[],
  isOnheadsets: boolean,
  reconnect: boolean |undefined
}
interface IBufferSizeType {
  title: string,
  check: boolean
}

export const initialState: ISettingsState = {
  autoPlay: true,
  bufferSize: [
    {
      title: '500 ms',
      check: true
    },
    {
      title: '5 sec',
      check: false
    },
    {
      title: '15 sec',
      check: false
    }
  ],
  isOnheadsets: true,
  reconnect: undefined
}
const settingsReducer = (state = initialState, action: IReduxAction<SettingsType>) => {

  switch (action.type) {
    case SettingsType.SET_RECONNECT:
      return { ...state, reconnect: action.payload }
    case SettingsType.SET_AUTO_PLAY:
      return { ...state, autoPlay: action.payload }
    case SettingsType.SET_IS_ON_HEADSES:
      return { ...state, isOnheadsets: action.payload }
    case SettingsType.SET_BUFFER_SIZE:
      let newArr = state.bufferSize
      for (let index = 0; index < newArr.length; index++) {
        const element = newArr[index];
        if (element.title == action.payload) {
          newArr[index].check = true
        } else {
          newArr[index].check = false
        }
      }
      return { ...state, bufferSize: newArr }

    default:
      return state;
  }
}
export default settingsReducer;