import React, { useRef } from 'react';
import Navigator from "../navigation/Navigator"
import { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux"
import Swiper from 'react-native-swiper'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity, SafeAreaView,
  StatusBar,
  TouchableHighlight,
  Animated,
  PanResponder
} from 'react-native';
import Heart from "../assets/icons/heart.svg"
import Modal from 'react-native-modal';
import { calcFontSize, calcHeight, calcWidth, deviceHeight, deviceWidth } from "../assets/styles/dimensions"

import {
  changeFavoriteType, changePlayingMusic,
} from '../store/actions/filterAction'
import { NavigationScreenProp } from 'react-navigation';
import RedHeart from "../assets/icons/redHeart.svg"
import SimpleImage from "./SimpleImage"
import PlaySvG from "../assets/icons/play.svg"
import Stop from "../assets/icons/stop.svg"
import { changeswipeablePanelActive } from '../store/actions/filterAction'
import { changeActiveIndex, changeplayItem, changePlayingData, changeSwiperData } from '../store/actions/menuActions'
import Arrow from "../assets/icons/arrow.svg"
import RecordSvg from "../assets/icons/disrecording.svg"
import DisRecordSvg from "../assets/icons/recording.svg"
import TrackPlayer from 'react-native-track-player';
import InfoSvg from "../assets/icons/infoMenu.svg"
import { getPlayList } from "../store/actions/playlistAction"
import { addFavorites } from '../store/actions/favoritesActions';
import BackGroundSvg from "../assets/icons/background.svg"
import global_styles from "../assets/styles/global_styles"
import GestureRecognizer from 'react-native-swipe-gestures';
import { backgroundColorSelector } from '../store/selector/themeSelector'
import { swipeDirections } from "react-native-swipe-gestures"
import { Dimensions } from 'react-native';
import BackSvg from "../assets/icons/backgraundHorizontal.svg"
import {
  playItemSelector,
  filterDataSelector,
  activeIndexSelector
} from '../store/selector/menuSelector'
import {
  playListTypeSelector,
  isPlayingMusicSelector,
  swipeablePanelActiveSelector
} from "../store/selector/filterSelector"
TrackPlayer.registerPlaybackService(() => require('../../service'));


interface Props {
  //onCloseStart(): void;
  // navigation: NavigationScreenProp<any, any>;
  // filterReducer: any,
  // toaddfavorite(type: any): void;
  // onchangeswipeablePanelActive(type: any): void;
  // onchangePlayingData(type: any): void;
  // isFavorite: boolean,
  // playUrl: string,
  // theme: any
  // chnageplayUrl(type: any): void;
  // ongetPlayList(type: any): void;
  // onchangePlayingMusic(type: boolean): void;
  // settingsReducer: any,
  // activeIndex: number,
  // onchangeplayItem(payload: any): void;
  // onchangeSwiperData(payload: any): void;
  // onchangeActiveIndex(payload: number): void;
  // menuReducer: any
  // list: any
}

var swiper: Object | null
const Bottom1: React.FunctionComponent<Props> = (props) => {
  const [animeted, setanimeted] = useState<boolean | null>(false)
  const [activBi, setactivBi] = useState<number | null>(null)
  const [activSwichItem, setactivSwichItem] = useState<any>(null)

  const [swiperactiveIndex, setswiperactiveIndex] = useState<number>(0)
  //  const filterReducer = useSelector(panelActiveSelector)
  const dispatch = useDispatch()

  const themebackground = useSelector(backgroundColorSelector)
  const playItem = useSelector(playItemSelector)
  const playListType = useSelector(playListTypeSelector)
  const isPlayingMusic = useSelector(isPlayingMusicSelector)
  const filterData = useSelector(filterDataSelector)  
  const activeIndex = useSelector(activeIndexSelector)
  const ispanelActive = useSelector(swipeablePanelActiveSelector)
  const swiperRef=useRef(null)
  useEffect(() => {
    if (ispanelActive) {
      console.log(swiperRef);
      
    }
  }, [ispanelActive])
  console.log(
    "themebackground", ispanelActive
  );

  function onSwipe(gestureName: any, gestureState: any) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    // this.setState({ gestureName: gestureName });
    switch (gestureName) {

      case SWIPE_LEFT:
        console.log("SWIPE_LEFT");
        if (swiperactiveIndex < filterData.length) {
            setswiperactiveIndex(swiperactiveIndex + 1)
            setactivBi(filterData[swiperactiveIndex + 1].st[0].bi)
           dispatch(changeActiveIndex(activeIndex + 1))

           dispatch(changePlayingData(filterData[swiperactiveIndex + 1]))

            if (isPlayingMusic && swiperactiveIndex + 1 == activeIndex) {
              dispatch(changePlayingMusic(true))
            } else {

              dispatch(changePlayingMusic(false))
            }
        }

        break;
      case SWIPE_RIGHT:
        console.log("SWIPE_RIGHT");
        if (swiperactiveIndex > 0) {
          setswiperactiveIndex(swiperactiveIndex - 1)
          setactivBi(filterData[swiperactiveIndex - 1].st[0].bi)
          dispatch(changePlayingData(filterData[swiperactiveIndex - 1]))
          dispatch(changeActiveIndex(activeIndex - 1))

            if (isPlayingMusic && swiperactiveIndex - 1 == activeIndex) {
              dispatch(changePlayingMusic(true))
            } else {
              dispatch(changePlayingMusic(false))
            }
        } else {
            if (isPlayingMusic && activeIndex == 0) {
              dispatch(changePlayingMusic(true))
            } else {

              dispatch(changePlayingMusic(false))
            }
            setswiperactiveIndex(0)
        }
        break;
    }
  }
  function _navigatePlayList() {
    // if (this.state.activSwichItem) {
    //     if (this.state.activSwichItem.pl) {
    //         this.props.ongetPlayList(this.state.activSwichItem)
    //         this.props.navigation.navigate('PlayList')
    //         this.props.onchangeswipeablePanelActive(false)
    //     }

    // } else if (this.props.menuReducer.playItem.pl) {
    //     this.props.ongetPlayList(this.props.menuReducer.playItem)
    //     this.props.navigation.navigate('PlayList')
    //     this.props.onchangeswipeablePanelActive(false)
    // }
  }
  function changeRadioStancia(item: any) {
    ///////dispatch(chnageplayUrl(item.ur))
    setactivBi(item.bi)
    if (isPlayingMusic) {
      //  this._pouseMusic()
      dispatch(changePlayingMusic(!isPlayingMusic))
      setTimeout(() => {
        // this._startPlayMusic()
        dispatch(changePlayingMusic(!isPlayingMusic))
      }, 500);
    }

  }
  function  isPlaying() {
    if (isPlayingMusic) {
       // this._pouseMusic()
    } else {
       // this._startPlayMusic()
    }
    console.log("changePlayingMusic",isPlayingMusic);
    
    dispatch(changePlayingMusic(!isPlayingMusic))
}
  function renderBottomSheet() {


    return <SafeAreaView   >
      <StatusBar barStyle={ispanelActive && themebackground == "white" ? 'dark-content' : 'light-content'}
        backgroundColor={ispanelActive ? themebackground : '#0F1E45'} />
      <View
        style={{
          backgroundColor: themebackground,
          height: deviceHeight, width: deviceWidth + 10,
          zIndex: 999,

        }}>


        <View style={{ flexDirection: 'row' }}>
          <View
            style={[styles.bottomSheet, { height: calcHeight(70) }]}>
            <View
              style={{
                paddingLeft: calcWidth(26),
                height: calcHeight(70),
                //  justifyContent: 'center',
                width: calcWidth(80),

              }}
            >
              <Arrow fill={themebackground == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
            </View>

          </View>
          {/* <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: calcHeight(70),
                            width: calcWidth(80),
                        }}
                        onPress={() => {
                            //this.props.toaddfavorite(this.props.menuReducer.playItem)
                        }}>
                        {this.props.isFavorite ?
                            <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                            <Heart fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                    </TouchableOpacity> */}
        </View>

        <View style={{
          height: calcHeight(460


          ), zIndex: 0
        }}>
          <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            //config={config}
            style={{
              flex: 1,

            }}
          >
            <View
              style={{ justifyContent: 'center', alignItems: 'center', }}>

              <Text style={{
                color: themebackground == "white" ? '#1E2B4D' : 'white',
                fontSize: calcFontSize(24),
                fontWeight: '500'
              }}>{filterData[swiperactiveIndex].pa}</Text>
            </View>
            <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: calcHeight(-120) }} />
            <View

              style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
              <SimpleImage size={calcHeight(257)} image={filterData[swiperactiveIndex].im} />
            </View>
            <View style={{ flexDirection: 'row' }}>

            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: calcWidth(20),
            }}>
              {filterData[swiperactiveIndex].pa == playItem.pa && playListType ?
                <Text style={{ color: themebackground == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>
                  {playListType.artist}  {playListType.song}
                </Text> : null}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
            }></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
            }>
              {
                filterData[swiperactiveIndex].st.map((item: any, index: number) => {
                  return <TouchableOpacity
                    key={index}
                    onPress={() => {
                      changeRadioStancia(item)

                    }}
                    style={item.bi == activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                  >
                    <Text style={styles.activenumber}>{item.bi}</Text>
                  </TouchableOpacity>
                })
              }
            </View>

          </GestureRecognizer>
        </View>

        <View style={{
          alignItems: 'center', marginTop: calcHeight(20), flexDirection: 'row', justifyContent: 'center',
        }}>
          <TouchableOpacity
            onPress={() => {
              //this.setState({ isRecording: !this.state.isRecording })
            }}
            style={[styles.btnrecord,
            { zIndex: 0, backgroundColor: themebackground == 'white' ? 'white' : '#0F1E45', }]}
          >
            {playItem.isRecording ?
              <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' /> :
              <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} />

            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (activSwichItem != null && activSwichItem.id != playItem.id) {
                //this._pouseMusic()
                dispatch(changeplayItem(filterData[swiperactiveIndex]))
                setTimeout(() => {
                  // this._startPlayMusic()
                  dispatch(changePlayingMusic(!isPlayingMusic))
                }, 500);
              } else {
              isPlaying()
              }

            }}
            style={[styles.btnPlay,
            { backgroundColor: themebackground == 'white' ? '#101C3B' : '#0F1E45', }]}>
            {isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
              <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!playItem.pl}
            style={[styles.btnrecord, { backgroundColor: themebackground == 'white' ? 'white' : '#0F1E45', }]}
            onPress={() => {
              _navigatePlayList()
            }}>
            <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={themebackground == 'white' ? '#1E2B4D' : 'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  }
  function renderBottomSheetheader() {
    return <View style={[styles.bottomHeader, {
      backgroundColor: themebackground == "white" ? '#EBEEF7' : '#0F1E45',
    }]}>
      <View
        style={{ height: calcHeight(86), width: calcWidth(270), backgroundColor: themebackground == "white" ? '#EBEEF7' : '#0F1E45', }}>
        <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>
          <View style={{ flexDirection: 'row' }}>
            <SimpleImage size={calcWidth(47)} image={playItem.im} />
            <View style={{ marginLeft: calcHeight(15) }}>
              <Text style={[styles.txtTitle, { color: themebackground == "white" ? "#1D2A4B" : 'white', }]}>{playItem.pa}</Text>
              {playListType ? <Text
                style={[styles.txtTitle,
                { fontSize: calcFontSize(12), marginTop: calcHeight(5), width: calcWidth(200), color: themebackground == "white" ? "#1D2A4B" : 'white' }]}>
                {playListType.artist} {playListType.song}</Text> : null}
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity
          style={global_styles.searchbtn}
          onPress={() => {
            //  this.props.toaddfavorite(this.props.menuReducer.playItem)
          }}
        >
          {/* {this.props.isFavorite ?
                        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                        <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />} */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.player,
          { backgroundColor: themebackground == "white" ? 'white' : '#0D1834' }]}
          onPress={() => {
            // this.isPlaying()
            dispatch(changePlayingMusic(!isPlayingMusic))
          }}
        >
          {isPlayingMusic ? <Stop width={calcWidth(16)} height={calcHeight(22)} fill={themebackground == "white" ? '#101C3B' : 'white'} /> :
            <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill={themebackground == "white" ? '#101C3B' : 'white'} />}
        </TouchableOpacity>
      </View>
    </View>
  }
  //            this.swiperRef.scrollTo(this.props.menuReducer.activeIndex)
  // console.log(":::::::::::::::::::::",swiper)
  // console.log(swiperRef);

  return (

    <Swiper
      height={deviceHeight - calcHeight(20)}
      horizontal={false}
      style={styles.wrapper}
      showsButtons={false}
      showsPagination={false}
      >
      <View
        onTouchStart={() => {
          console.log("onstart");

        }}
        onMagicTap={() => {
          console.log("onMagicTap");

        }}
        style={styles.slide1}>
        {renderBottomSheetheader()}
      </View>
      <View
      >
        {renderBottomSheet()}
      </View>
    </Swiper>
  );
};
export default Bottom1;
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  bottomHeader: {
    height: 86,
    backgroundColor: 'red'
  },
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    alignItems: 'center',
    backgroundColor: "white",
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  },
  shadowContent: {
    height: calcHeight(86),
    elevation: 10,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  panResponderView: {
    zIndex: 2,
    position: 'absolute',
    width: "100%",
    //height: calcHeight(86),
    backgroundColor: "yellow"
  },

  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },

  row: {
    flexDirection: 'row',

    alignItems: 'center',

  },
  bottomSheet: {
    height: calcHeight(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: calcHeight(20),
    width: '80%'
  },
  numbers: {
    height: calcHeight(28),
    width: calcWidth(47),
    backgroundColor: '#101C3B',
    borderRadius: calcWidth(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  activenumber: {
    color: '#8B95AF',
    fontSize: calcFontSize(14),
    fontWeight: '500'
  },
  btnPlay: {
    width: calcHeight(85),
    height: calcHeight(85),
    backgroundColor: '#101C3B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginHorizontal: calcWidth(28),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
  },
  activeNumbers: {
    height: calcHeight(28),
    width: calcWidth(47),
    backgroundColor: 'white',
    borderRadius: calcWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: calcWidth(15),
    elevation: 5,
  },
  albImg: { height: calcHeight(257), marginTop: calcHeight(24), justifyContent: 'center', alignItems: 'center', },
  modal: {
    height: calcHeight(269.03),
    width: calcWidth(265),
    borderRadius: calcWidth(8),
  },
  btnrecord: {
    width: calcHeight(68),
    height: calcHeight(68),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 4,
  },
  txtTitle: {
    fontSize: calcFontSize(15),
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: '#1D2A4B',
  },
  player: {
    backgroundColor: 'white',
    width: calcHeight(54),
    height: calcHeight(54),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcWidth(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  modalView: {
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#F3F4F5',
    paddingHorizontal: 29
  },
  modalItem: {
    fontSize: 15,
    fontWeight: '500',
  },
  modalMenuRadio: {
    backgroundColor: 'white',
    height: calcHeight(560),
    marginHorizontal: calcWidth(45),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrow: {
    paddingLeft: calcWidth(22),
    height: calcHeight(70),
    marginTop: -20,
    justifyContent: 'center',
    width: calcWidth(80), zIndex: 1,

  }
})