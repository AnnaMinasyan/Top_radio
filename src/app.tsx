import React, {useMemo} from 'react';
import { View, SafeAreaView, StatusBar,Image ,Text,TouchableOpacity} from 'react-native';
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
import NetInfo from "@react-native-community/netinfo";
import {changeIsConnected} from "./store/actions/bottomAction"
import {initTimerSleep} from "./utils/timer_sleep"
import {selectedRadioStationSelector,swiperShowRadiostationSelector,isConnectedSelector } from "./store/selector/bottomSelector"
import Modal from 'react-native-modal';
import player from "./services/player/PlayerServices"; // 2.4.0
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
 const [timerSleep,settimerSleep] =useState<boolean>()
    const isConnected =useSelector(isConnectedSelector)
    const [visibleModal,setVisibleModal]=useState<boolean>(true)
    const [visibleModal1,setVisibleModal1]=useState<boolean>(true)
    useEffect(() => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            dispatch(changeIsConnected(state.isConnected))

            setVisibleModal(!state.isConnected)
        });
        getData("timerSleep").then((time)=>{
            settimerSleep(time)
        })
        dispatch(initFavorites())
        dispatch(initMenuType())
        dispatch(initAutoPlay())
        dispatch(setHeightWidth({height:height,width:width}))
        return player.init(null)
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
        isConnected?
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle='light-content' backgroundColor="#0F1E45" />

            <Navigator/>
            { init(changeActivePanel)}
            {/*{selectedRadioStation || swiperShowRadiostation?*/}
            {/*    <BottomSwiper*/}
            {/*        isSwiper={true}*/}
            {/*        // navigation={this.props.navigation}*/}
            {/*    />: <View />}*/}

          
             {initTimerSleep(timerSleep)}
        </SafeAreaView>
            :<View>
                <Image style={{resizeMode:'center'}} source={require('./assets/images/launch_screen.png')}/>
                <Modal
                    isVisible={!isConnected}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                    backdropOpacity={0.2}
                    onBackdropPress={() => {setVisibleModal(false)} } >
                    {<View style={{backgroundColor:'white', height:150,padding:10}}>
                        <Text style={{fontSize:22, fontWeight:'bold', marginBottom:8}}>Нет подключения к интернету </Text>
                        <Text style={{fontSize:16,lineHeight:20}}>Подключите соединение или мобильный интернет для прослушивания радиостанций </Text>
                        <TouchableOpacity
                            onPress={()=>{
                                dispatch(changeIsConnected(true))
                                dispatch(initFavorites())
                                dispatch(initMenuType())
                                dispatch(initAutoPlay())
                            }}
                            style={{marginTop:25, width:'100%', alignItems:'flex-end'}}
                        >
                            <Text style={{color:'green',fontSize:17}}>Перепадключится</Text>
                        </TouchableOpacity>
                    </View>}
                </Modal>
            </View>
    );
};
export default MyApp;
