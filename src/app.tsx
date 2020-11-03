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
import {init} from './utils/createAlarmClock'
import {initTimerSleep} from  './utils/timer_sleep'
import { getData, storeData } from "./utils/local_storage"
import { _startPlayMusic } from "./utils/playMusic"
interface Props {
    onchangeswipeablePanelActive(payload: boolean): void;
    filterReducer: any,
    navigation: NavigationScreenProp<any, any>,
}
const MyApp: React.FunctionComponent<Props> = (props) => {
    const [animeted, setanimeted] = useState<boolean | null>(false)
    const [isPlayingMusic, setisPlayingMusic] = useState<boolean>(false)
    const activeitem = useSelector(playItemSelector)
    const dispatch = useDispatch()
    const bs: any = React.createRef()
    useEffect(() => {
        const data = new Date()
        dispatch(initFavorites())
        dispatch(initMenuType())
        dispatch(initAutoPlay())
    }, [])
    const changeActivePanel = () => {
        getData('alarmClock').then((time) => {
            dispatch(changeswipeablePanelActive(false))
            dispatch(changeplayItem(time.playItem))
            dispatch(changePlayingMusic(true))
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle='light-content' backgroundColor="#0F1E45" />
           
            {/* <Intro/> */}
            <Navigator />
            {/* {animeted? */}
            {/* <Buttom/> */}
        {/* :null}   */}
           { init(changeActivePanel) } 
           {/* {initTimerSleep(timerSleep)} */}
        </SafeAreaView>
    );
};
export default MyApp;
