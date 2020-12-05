import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import Navigator from "./navigation/Navigator"
import { NavigationScreenProp } from 'react-navigation';
import { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { initFavorites } from './store/actions/favoritesActions';
import { initAutoPlay } from "./store/actions/settingsAcrion"
import { changePlayingMusic, initMenuType } from './store/actions/filterAction';
import { changeplayItem } from './store/actions/bottomAction';
import { init } from './utils/createAlarmClock'
import { getData, storeData } from "./utils/local_storage"
import { Dimensions, PixelRatio } from 'react-native';
import {setHeightWidth} from './store/actions/themeAction'
import BottomSwiper from './components/BottomSwiper'
import {selectedRadioStationSelector,swiperShowRadiostationSelector } from "./store/selector/bottomSelector"
interface Props {
    onchangeswipeablePanelActive(payload: boolean): void;
    filterReducer: any,
    navigation: NavigationScreenProp<any, any>,
}
const MyApp: React.FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch()
    const [width, setWidth] = useState<number>(Dimensions.get('window').width)
    const [height, setHeight] = useState<number>(Dimensions.get('window').height)
    const selectedRadioStation=useSelector(selectedRadioStationSelector)
    const swiperShowRadiostation=useSelector(swiperShowRadiostationSelector)

    useEffect(() => {
        dispatch(initFavorites())
        dispatch(initMenuType())
        dispatch(initAutoPlay())
        dispatch(setHeightWidth({height:height,width:width}))
    }, [])
    const changeActivePanel = () => {
        getData('alarmClock').then((time) => {
            dispatch(changeplayItem(time.playItem))
            dispatch(changePlayingMusic(true))
        })
    }
    Dimensions.addEventListener('change', (value: any) => {

        setHeight(value.window.height)
        setWidth(value.window.width)
    })
    useEffect(() => {
        dispatch(setHeightWidth({height:height,width:width,albomeMode:width>height}))
      //  console.log(width, height);
    }, [width, height])


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle='light-content' backgroundColor="#0F1E45" />
            <Navigator/>
            { init(changeActivePanel)}
            
            {selectedRadioStation || swiperShowRadiostation?
                    <BottomSwiper
                    isSwiper={true}
                       // navigation={this.props.navigation}
                    />: <View />}
          
            {/* {initTimerSleep(timerSleep)} */}
        </SafeAreaView>
    );
};
export default MyApp;
