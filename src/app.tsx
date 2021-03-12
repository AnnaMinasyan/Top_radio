import React, { useMemo } from 'react';
import { View, SafeAreaView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import Navigator from "./navigation/Navigator"
import { NavigationScreenProp } from 'react-navigation';
import { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { initFavorites } from './store/actions/favoritesActions';
import { initAutoPlay } from "./store/actions/settingsAcrion"
import { changePlayingMusic, initMenuType } from './store/actions/filterAction';
import { changeplayItem, changeSelectedRadioStation, changeMiniScreenData } from './store/actions/bottomAction';
import { initAlarmClock } from './utils/createAlarmClock'
import { getData, storeData } from "./utils/local_storage"
import { Dimensions, PixelRatio } from 'react-native';
import { setHeightWidth } from './store/actions/themeAction'
import { addFavorites } from './store/actions/favoritesActions'
import NetInfo from "@react-native-community/netinfo";
import { changeIsConnected } from "./store/actions/bottomAction"
import { initTimerSleep } from "./utils/timer_sleep"
import { selectedRadioStationSelector, alarmClockRadioStationSelector, isConnectedSelector } from "./store/selector/bottomSelector"
import Modal from 'react-native-modal';
import player from "./services/player/PlayerServices"; // 2.4.0
interface Props {
    onchangeswipeablePanelActive(payload: boolean): void;
    filterReducer: any,
    navigation: NavigationScreenProp<any, any>,
}
import { NavigationContainer } from '@react-navigation/native';

const MyApp: React.FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch()
    const [width, setWidth] = useState<number>(Dimensions.get('window').width)
    const [height, setHeight] = useState<number>(Dimensions.get('window').height)
    const [activeRadiostation,setRadiostation]=useState<any>()
    const isConnected = useSelector(isConnectedSelector)
    const alarmClockRadioStation=useSelector(alarmClockRadioStationSelector)
    const timerSleep = () => {
        console.log("sleeesssssssssssssssssssssssssssssssssp")
        player.stopPlayer()
       
    }
    useEffect(()=>{
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
return console.log("closeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    },[])
   const  createAlarmClock  =(radioStation:any)=> {
            player.open()
            if (radioStation) {
                let playingData = {
                    data: radioStation,
                    isPlayingMusic: true,
                    activeBi: radioStation.st[0],
                    id:radioStation.id,
                }
                dispatch(changeSelectedRadioStation(playingData))
                dispatch(changeMiniScreenData(playingData))

                player._startPlayMusic(playingData.data, playingData.activeBi)
            }
    }
    useEffect(() => {
        NetInfo.fetch().then(state => {
            dispatch(changeIsConnected(state.isConnected))

        });
        getData("timerSleepTime").then((time) => {
            if (time) {
                initTimerSleep(timerSleep, time)
            }
        })
        getData("alarmClock").then((time) => {
            console.log("alarmclock", time)
            if (time) {
                initAlarmClock(createAlarmClock, time)
            }
        })
        getData("favorites").then((res) => {
            if (res) {
                dispatch(addFavorites(res))
            }

        })
        dispatch(initFavorites())
        dispatch(initMenuType())
        dispatch(initAutoPlay())
        dispatch(setHeightWidth({ height: height, width: width }))
     
    }, [isConnected])


    Dimensions.addEventListener('change', (value: any) => {

        setHeight(value.window.height)
        setWidth(value.window.width)
    })
    useEffect(() => {
        dispatch(setHeightWidth({ height: height, width: width, albomeMode: width > height }))
        //  console.log(width, height);
    }, [width, height])


    return (
        isConnected ?
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar barStyle='light-content' backgroundColor="#0F1E45" />
                <NavigationContainer>
                    <Navigator />
                </NavigationContainer>
            </SafeAreaView>
            : (<View>
                <Image style={{ resizeMode: 'center' }} source={require('./assets/images/launch_screen.png')} />
                <Modal
                    isVisible={!isConnected}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                    backdropOpacity={0.2}
                    onBackdropPress={() => {  }} >
                    {<View style={{ backgroundColor: 'white', height: 150, padding: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Нет подключения к интернету </Text>
                        <Text style={{ fontSize: 16, lineHeight: 20 }}>Подключите соединение или мобильный интернет для прослушивания радиостанций </Text>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(changeIsConnected(true))
                                dispatch(initFavorites())
                                dispatch(initMenuType())
                                dispatch(initAutoPlay())
                            }}
                            style={{ marginTop: 25, width: '100%', alignItems: 'flex-end' }}
                        >
                            <Text style={{ color: 'green', fontSize: 17 }}>Переподключится</Text>
                       </TouchableOpacity>
                    </View>}
                </Modal>
            </View>)
    );
};
export default MyApp;
