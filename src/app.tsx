import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Navigator from "./navigation/Navigator"
import { NavigationScreenProp } from 'react-navigation';
import { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { playItemSelector } from "../src/store/selector/bottomSelector"

import { initFavorites } from './store/actions/favoritesActions';
import { initAutoPlay } from "./store/actions/settingsAcrion"
import { changeswipeablePanelActive, changePlayingMusic, initMenuType } from './store/actions/filterAction';
import { changeplayItem } from './store/actions/bottomAction';
import Intro from "./screens/Intro"
import Buttom from './components/Bottom';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { init } from './utils/createAlarmClock'
import { initTimerSleep } from './utils/timer_sleep'
import { getData, storeData } from "./utils/local_storage"
import { _startPlayMusic } from "./utils/playMusic"
import { Dimensions, PixelRatio } from 'react-native';
import {setHeightWidth} from './store/actions/themeAction'
import BottomSwiper from './components/BottomSwiper'
import {selectedRadioStationSelector } from "./store/selector/bottomSelector"
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
    // const widthPixelRatio = (amount: number) =>
    //     PixelRatio.roundToNearestPixel(width * amount);
    // const convertWidthPixelsToPercent = (widthInPx: number) =>
    //     widthInPx / 375;
    // const calcWidth = (px: number) =>
    //     widthPixelRatio(convertWidthPixelsToPercent(px));
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
            <Navigator />
            { init(changeActivePanel)}
            
            {selectedRadioStation ?
                    <BottomSwiper
                    isSwiper={true}
                       // navigation={this.props.navigation}
                    />: <View />}
          
            {/* {initTimerSleep(timerSleep)} */}
        </SafeAreaView>
    );
};
export default MyApp;
