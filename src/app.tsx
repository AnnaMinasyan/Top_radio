import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Navigator from "./navigation/Navigator"
import { NavigationScreenProp } from 'react-navigation';
import { useEffect, useState, } from 'react';
import { useSelector,useDispatch } from "react-redux"
import { panelActiveSelector, playItem } from "../src/store/selector/filterSelector"
import { initFavorites } from './store/actions/favoritesActions';
import { changeswipeablePanelActive,changeplayItem ,changePlayingMusic} from './store/actions/filterAction';
import {init} from "./utils/createAlarmClock"
import { getData, storeData } from "./utils/local_storage"

import {_startPlayMusic} from "./utils/playMusic"
interface Props {
    onchangeswipeablePanelActive(payload: boolean): void;
    filterReducer: any,
    navigation: NavigationScreenProp<any, any>,
}
const MyApp: React.FunctionComponent<Props> = (props) => {
    const [animeted, setanimeted] = useState<boolean | null>(false)
     const [isPlayingMusic, setisPlayingMusic] = useState<boolean>(false)
    const filterReducer = useSelector(panelActiveSelector)
    const dispatch=useDispatch()
    const item = useSelector(playItem)
    const bs: any = React.createRef()
    
    useEffect(() => {
       const data= new Date()
        dispatch(initFavorites())
    }, [])
   const  changeActivePanel =()=>{
    getData('alarmClock').then((time)=>{
        console.log("alarmClockalarmClock",time.playItem);
        dispatch(changeswipeablePanelActive(false))
        dispatch(changeplayItem(time.playItem))
        dispatch(changePlayingMusic(true))
    }) 
   }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Navigator />
          {  init(changeActivePanel)} 
        </SafeAreaView>
    );
};
export default MyApp;
