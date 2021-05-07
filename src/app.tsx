import React, { useMemo } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Navigator from "./navigation/Navigator";
import { NavigationScreenProp } from "react-navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  appCreateFavorites,
  initFavorites,
} from "./store/actions/favoritesActions";
import { changeReconnenct, initAutoPlay } from "./store/actions/settingsAcrion";
import { changePlayingMusic, initMenuType } from "./store/actions/filterAction";
import {
  changeplayItem,
  changeSelectedRadioStation,
  changeMiniScreenData,
  changeSelectedRadioStationPlaying,
  changeSwiperShowStation,
  changeMiniSelect
} from "./store/actions/bottomAction";
import { initAlarmClock } from "./utils/createAlarmClock";
import { getData, storeData } from "./utils/local_storage";
import { Dimensions, PixelRatio } from "react-native";
import {
  changeBackgroundColor,
  setHeightWidth,
} from "./store/actions/themeAction";
import { addFavorites } from "./store/actions/favoritesActions";
import NetInfo from "@react-native-community/netinfo";
import { changeIsConnected } from "./store/actions/bottomAction";
import { initTimerSleep } from "./utils/timer_sleep";
import {
  selectedRadioStationSelector,

  isConnectedSelector,
} from "./store/selector/bottomSelector";
import Modal from "react-native-modal";
import player from "./services/player/PlayerServices"; // 2.4.0
interface Props {
  onchangeswipeablePanelActive(payload: boolean): void;
  filterReducer: any;
  navigation: NavigationScreenProp<any, any>;
}
import { NavigationContainer } from "@react-navigation/native";

import { changeLookingList } from "./store/actions/menuActions";
import HeadphoneDetection from 'react-native-headphone-detection';
import { isOnheadsetsSelector, reconnectSelector } from "./store/selector/settingsSelector";
import SplashScreen from "react-native-splash-screen";

const MyApp: React.FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState<number>(Dimensions.get("window").width);
  const [height, setHeight] = useState<number>(Dimensions.get("window").height);
  const isConnected = useSelector(isConnectedSelector);
  const selectedRadioStation = useSelector(selectedRadioStationSelector)
  
  const timerSleep = () => {
    player.stopPlayer();
  };
  const [loading, setloading] = useState<boolean>(false);
  const isOnheadsets = useSelector(isOnheadsetsSelector)
  const reConnect=useSelector(reconnectSelector)
  
  const createAlarmClock = (data: any) => {
    
    if (data) {
      player.open(data)
      // let playingData = {
      //   data: radioStation,
      //   isPlayingMusic: true,
      //   activeBi: radioStation.st[0],
      //   id: radioStation.id,
      //   index: radioStation.data.index,
      // };
      // let info = {
      //   radioStation: radioStation,
      //   index: radioStation.index,
      //   isPlayingMusic: true,
      //   search: null
      // }
      console.log('sdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd');
      
  dispatch(changeMiniSelect(data.radioStation));

     player._startPlayMusic(data.radioStation.data,
      data.radioStation?.data.st[0])    }
  };
  useEffect(() => {
   
    getData("isLooking").then((lookingList) => {
      if (lookingList) {
        dispatch(changeLookingList(lookingList));
      } else {
        dispatch(changeLookingList([]));
        storeData("isLooking", []);
      }
    });
    getData("theme").then((res) => {
      if (res) {
        dispatch(changeBackgroundColor(res));
      } else {
        dispatch(changeBackgroundColor(false));
      }
    });
    getData("timerSleepTime").then((time) => {
      if (time) {
        initTimerSleep(timerSleep, time);
      }
    });
    getData("alarmClock").then((time) => {
      if (time) {
        initAlarmClock(createAlarmClock, time);
      }
    });
    getData("favorites").then((res) => {
      if (res) {
        dispatch(appCreateFavorites(res));
      } else {
        dispatch(initFavorites());
      }
    });
    getData('reconnect').then((reconnect) => {
      if (reconnect) {
        console.log('reconnectreconnectreconnect');
        
        dispatch(changeReconnenct(reconnect))
      }
    })
    getData("autoPlay").then((res) => {
      if (res) {
        getData("autoPlayData").then((info) => {
          let d = {
            radioStation: { ...info, isPlayingMusic: true },
            index: undefined,
            isPlayingMusic: true,
            search: ''
          }
          player.open(d);

          player._startPlayMusic(info.data, info.activeBi);
          dispatch(changeMiniSelect({ ...info, isPlayingMusic: true }))
        });
      }
    });
    dispatch(initMenuType());
    dispatch(initAutoPlay());
    dispatch(setHeightWidth({ height: height, width: width }));
  }, []);


  HeadphoneDetection.addListener(date => {
    if (selectedRadioStation?.isPlayingMusic && !date.audioJack && !date.bluetooth && isOnheadsets) {
      player._pouseMusic()
    } else if (selectedRadioStation?.isPlayingMusic && !date.audioJack && !date.bluetooth && !isOnheadsets) {
      player._startPlayMusic(selectedRadioStation.data, selectedRadioStation.activeBi)
      dispatch(changeSelectedRadioStationPlaying(true))
    }
  })
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
    console.log(state.isConnected ,'reConnect', reConnect);
    
      if (state.isConnected && reConnect) {

        getData('activeRadioStation').then((activeRadioStation) => {
          console.log('activeRadioStation',activeRadioStation?.isPlayingMusic);
          
          if (activeRadioStation && activeRadioStation.isPlayingMusic) {
            let info = {
              radioStation: activeRadioStation,
              index: undefined,
              isPlayingMusic: true,
              search: ''
            }
            dispatch(changeMiniScreenData(activeRadioStation))
            dispatch(changeSelectedRadioStation(activeRadioStation))
            player.open(info);
            player._startPlayMusic(activeRadioStation.data, activeRadioStation.activeBi)

          }
        })
      }else{
        dispatch(changeMiniSelect(undefined));

      }
    

      dispatch(changeIsConnected(state.isConnected));
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);


  Dimensions.addEventListener("change", (value: any) => {
    setHeight(value.window.height);
    setWidth(value.window.width);
  });
  useEffect(() => {
    dispatch(
      setHeightWidth({
        height: height,
        width: width,
        albomeMode: width > height,
      })
    );
    //  console.log(width, height);
  }, [width]);
  return isConnected ? (

    <Navigator />

  ) : (
    <View>
      <Image
        style={{ resizeMode: "center" }}
        source={require("./assets/images/launch_screen.png")}
      />

      <Modal
        isVisible={!isConnected}
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
        backdropOpacity={0.2}
        onBackdropPress={() => { }}
      >
        {
          <View style={{ backgroundColor: "white", height: 'auto', padding: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
              Нет подключения к интернету
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 20 }}>
              Подключите соединение или мобильный интернет для прослушивания
              радиостанций
            </Text>
            <TouchableOpacity
              onPress={() => {
                setloading(true);
                NetInfo.fetch().then((state) => {
                  dispatch(changeIsConnected(state.isConnected));
                  setloading(!state.isConnected);
                });
                setTimeout(() => {
                  setloading(false);
                }, 5000);
              }}
              style={{ marginTop: 25, width: "100%", alignItems: "flex-end" }}
            >
              {loading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#0F1E45" />
                </View>
              ) : (
                <Text style={{ color: "green", fontSize: 17 }}>
                  Переподключится
                </Text>
              )}
            </TouchableOpacity>
          </View>
        }
      </Modal>
    </View>
  );
};
export default MyApp;
