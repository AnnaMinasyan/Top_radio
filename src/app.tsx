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


const MyApp: React.FunctionComponent<any> = (props) => {
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
  const reConnect = useSelector(reconnectSelector)
  const [configsetings, setConfigSettings] = useState<boolean>(false);
  let fistTime = true;
  let settings: any = {
    "timerSlipeTime": null,
    'autoPlay': false,
    'reconnect': true,
  };
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

      dispatch(changeMiniSelect(data.radioStation));

      player._startPlayMusic(data.radioStation.data,
        data.radioStation?.data.st[0])
    }
  };
  const isLooking = () => {
    getData("isLooking").then((lookingList) => {
      if (lookingList) {
        dispatch(changeLookingList(lookingList));
      } else {
        dispatch(changeLookingList([]));
        storeData("isLooking", []);
      }
    });
  }
  const theme = () => {
    getData("theme").then((res) => {
      if (res) {
        dispatch(changeBackgroundColor(res));
      } else {
        dispatch(changeBackgroundColor(false));
      }
    });
  }
  const alarmClock = () => {
    getData("alarmClock").then((time) => {
      if (time) {
        initAlarmClock(createAlarmClock, time);
      }
    });
  }
  const internetConnectHandler = () => {
    // Subscribe to network state updates
 //   console.log('------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', settings.autoPlay, fistTime);

    return NetInfo.addEventListener(state => {
      console.log(state,'000000000000');
       if(state.isConnected!=isConnected)
     {
        dispatch(changeIsConnected(state.isConnected));
      console.log("reConnect", settings);
      
      if (state.isConnected && settings.reconnect) {
        getData('activeRadioStation').then((activeRadioStation) => {
          const b = fistTime ? settings.autoPlay : true;
       //  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;+++++++++++++++++++++++;;;;;;;;;;;;;",activeRadioStation?.isPlayingMusic, b);

          if (activeRadioStation && activeRadioStation?.isPlayingMusic && b) {

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
      } else {
        dispatch(changeMiniSelect(undefined));

      }

      fistTime = false;}
    });
  
  }
  useEffect(() => {
    isLooking();
    theme();
    alarmClock()
    getData("favorites").then((res) => {
      if (res) {
        dispatch(appCreateFavorites(res));
      } else {
        dispatch(initFavorites());
      }
    });
    getData("settings").then((_settings) => {
      internetConnectHandler();
      if (_settings) {
        settings = _settings;

        if (settings?.autoPlay) {
          console.log('autoPlayData');
          
          getData("autoPlayData").then((info) => {
            console.log(info);
            
            if(info){
            let d = {
              radioStation: { ...info, isPlayingMusic: true },
              index: undefined,
              isPlayingMusic: true,
              search: ''
            }
            player.open(d);

            player._startPlayMusic(info.data, info.activeBi);
            dispatch(changeMiniSelect({ ...info, isPlayingMusic: true }))
          }
          });
        }
        //const unsubscribe = 

        if (settings?.timerSlipeTime) {
          initTimerSleep(timerSleep, settings.timerSlipeTime);
        }
        if (settings?.reconnect) {
          dispatch(changeReconnenct(settings.reconnect))
        }
        //return unsubscribe
      } else {
        storeData('settings', settings)
      }
    })

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
  console.log('isConnectedisConnected', isConnected);

  return isConnected ? (

    <Navigator />

  ) : (

    isConnected == false && <View>
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
