import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Navigator from "./navigation/Navigator"
import { NavigationScreenProp } from 'react-navigation';
import { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { swipeablePanelActiveSelector, playItemSelector } from "../src/store/selector/filterSelector"
import { initFavorites } from './store/actions/favoritesActions';
import { initAutoPlay } from "./store/actions/settingsAcrion"
import { changeswipeablePanelActive, changePlayingMusic, initMenuType } from './store/actions/filterAction';
import { changeplayItem } from './store/actions/menuActions';
import Intro from "./screens/Intro"
import Button from './components/Bottom';

import SlidingUpPanel from 'rn-sliding-up-panel';
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
    const filterReducer = useSelector(swipeablePanelActiveSelector)
    const dispatch = useDispatch()
    const item = useSelector(playItemSelector)
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
            {/* <View style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Button title='Show panel' onPress={() => this._panel.show()} />
                <SlidingUpPanel ref={c => this._panel = c}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text>Here is the content inside panel</Text>
                        <Button title='Hide' onPress={() => this._panel.hide()} />
                    </View>
                </SlidingUpPanel>
            </View> */}
            {/* <Intro/> */}
            <Navigator />
            {filterReducer!=null?
            <Button/>:null}
            {/* {  init(changeActivePanel)}  */}
        </SafeAreaView>
    );
};
export default MyApp;
