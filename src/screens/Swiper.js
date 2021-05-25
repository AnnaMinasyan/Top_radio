import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  changeplayItem,
  changeSelectedRadioStationPlaying,
  changeSwiperActiveBi,
  changeSelectedSatationbyBi,
  getSongData,
  changeSelectedRadioStation,
  changeMiniScreenData,
  changeSwiperShowStation,
  changeIsConnected
} from "../store/actions/bottomAction";
import BackGroundSvg from "../assets/icons/background.svg";
import RecordSvg from "../assets/icons/disrecording.svg";
import DisRecordSvg from "../assets/icons/recording.svg";
import InfoSvg from "../assets/icons/infoMenu.svg";
import Arrow from "../assets/icons/arrow.svg";
import RedHeart from "../assets/icons/redHeart.svg";
import Heart from "../assets/icons/heart.svg";
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceHeight,
  deviceWidth,
} from "../assets/styles/dimensions";
import SimpleImage from "../components/SimpleImage";
import Modal from "react-native-modal";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import PlaySvG from "../assets/icons/play.svg";
import Stop from "../assets/icons/stop.svg";
import player from "../services/player/PlayerServices";
import { getData, storeData } from "../utils/local_storage";
const MARGIN_TOP = Platform.OS === "ios" ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get("window").height + calcHeight(55);
type Props = {
  hasRef?: () => void,
  swipeHeight?: number,
  itemMini?: object,
  itemFull: object,
  disablePressToShow?: boolean,
  style?: object,
  onShowMini?: () => void,
  onShowFull?: () => void,
  toaddfavorite?: () => void,
  closed?: () => void,
  checkIsFovorite?: () => void,
  backgroundColor: String,
  bottomReducer: any,
  animation?: "linear" | "spring" | "easeInEaseOut" | "none",
  orientation: String,
  onchangeIsConnected: (v) => void,
  onchangeSwiperShowStation: (v) => void,
  onStopRecord: () => void,
  onStartRecord: () => void,
  changeRadioStancia: (v) => void,
  isPlaying: () => void,
  onchangeSelectedRadioStationPlaying(payload: any): void,
  _addLookingList(payload: any): void,
  _navigatePlayList(): void,
};
class SwipeUpDown extends Component<Props> {
  static defautProps = {
    disablePressToShow: false,
  };
  buttomValue;
  close;
  constructor(props) {
    super(props);
    this.state = {
      startDrag: false,
      collapsed: true,
      fadeAnim: new Animated.Value(0),
      animHeader: new Animated.Value(1),
      swipeAnimation: new Animated.Value(deviceHeight),
      visible: false,
      loading: true,
      close: false,
    };
    this.close = false;
    this.disablePressToShow = props.disablePressToShow;
    this.SWIPE_HEIGHT = props.swipeHeight;
    this._panResponder = null;
    this.top = 0;

    // this.top = DEVICE_HEIGHT-190;
    this.height = this.SWIPE_HEIGHT;
    this.customStyle = {
      style: {
        bottom: 0,
        // top: DEVICE_HEIGHT-86,
        // height: this.height
      },
    };
    this.buttomValue = this.props.theme.albomeMode
      ? Dimensions.get("window").height -
      (86 +
        (Dimensions.get("screen").height - Dimensions.get("window").height >
          48
          ? 78
          : 85))
      : Dimensions.get("window").height -
      (86 +
        (Dimensions.get("screen").height - Dimensions.get("window").height >
          48
          ? 56
          : 68));
    this.showFull = this.showFull.bind(this);
    this.count = 0;
    Dimensions.addEventListener("change", this._changeHAndler.bind(this));
  }
  _changeHAndler(value) {
    const albome = value.window.width > value.window.height;
    this.buttomValue = albome
      ? value.window.height -
      (86 +
        (Dimensions.get("screen").height - Dimensions.get("window").height >
          48
          ? 78
          : 85))
      : value.window.height -
      (86 +
        (Dimensions.get("screen").height - Dimensions.get("window").height >
          48
          ? 56
          : 68));
    if (this.state.visible) {
      if (this.state.swipeAnimation._value != 0) {
        this.move(this.buttomValue);
      }
    }
    // if (albome && this.state.visible) {
    //     this.customStyle.style.top = value.window.height - 50 - 86;
    //     this.height = DEVICE_HEIGHT;
    //     this.updateNativeProps();
    // } else {
    //     this.customStyle.style.top = value.window.height - 50 - 86;
    //     this.height = DEVICE_HEIGHT;
    //     this.updateNativeProps();
    // }
    // setHeight(value.window.height)
    // setWidth(value.window.width)
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this._changeHAndler);
  }

  fadeIn = () => {
    this.setState({ visible: true });

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.animHeader, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(
      Animated.timing(this.state.animHeader, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start()
    );
    //this.close = false
    this.setState({ visible: false, close: false });
    //this.setState({visible:false})
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !(Math.abs(gestureState.dx) + Math.abs(gestureState.dy) < 5);
      },
      // onPanResponderStart:() =>{this._onPanResponderStart(this)},
      onPanResponderEnd: () => {
        this._onPanResponderEnd(this);
      },
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this),
    });
  }
  _onPanResponderEnd() {
    if (this.state.visible) {
      //this.close = true
      this.setState({ close: true });
    }
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
    // setTimeout(() => {
    //   //console.log("-animat");
    //   Animated.timing(this.state.swipeAnimation, {
    //     toValue: 500,
    //     duration: 500,
    //     useNativeDriver: true,
    //   }).start();
    // }, 5000);
  }

  updateNativeProps() {
    switch (this.props.animation) {
      case "linear":
        LayoutAnimation.linear();
        break;
      case "spring":
        LayoutAnimation.spring();
        break;
      case "easeInEaseOut":
        LayoutAnimation.easeInEaseOut();
        break;
      case "none":
      default:
        break;
    }
    // this.viewRef.setNativeProps(this.customStyle);
  }
  renderBottomSheetHorizontal() {
    let listPlayer = this.props.playListReducer.swiperListType == 'main' ? this.props.menuReducer.menuData
      : this.props.menuReducer.filterData
    return (
      <ImageBackground
        resizeMode={"stretch"}
        source={require("../assets/images/img.png")}
        style={{
          width: this.props.theme.width,
          height: this.props.theme.height * 0.8,
        }}
      >
        <View>
          <View
            // {...this._panResponder.panHandlers}
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: this.props.theme.height / 8,
                width: "13%",
                justifyContent: "center",
                paddingLeft: 20,
              }}
            >
              <Arrow
                fill={
                  this.props.backgroundColor == "white" ? "#1E2B4D" : "white"
                }
                height={10.59}
                width={19.8}
              />
            </View>
            <View
              // {...this._panResponder.panHandlers}
              style={{
                height: 60,
                width: 200,
                paddingTop: 20,
              }}
            >
              {!this.state.loading &&
                this.props.bottomReducer.swiperShowRadiostation ? (
                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      this.props.backgroundColor == "white"
                        ? "#1E2B4D"
                        : "white",
                    fontSize: 24,
                    fontWeight: "500",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {this.props.bottomReducer.swiperShowRadiostation.data?.pa}
                </Text>
              ) : null}
            </View>
            {!this.state.loading ? (
              <View
                /// {...this._panResponder.panHandlers}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                  height: this.props.theme.height / 8,
                  paddingTop: 20,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      this.props.theme.backgroundColor == "white"
                        ? "#1E2B4D"
                        : "white",
                    fontSize: 17,
                    width: this.props.theme.width / 2.6,
                    textAlign: "center",
                  }}
                >
                  {
                    this.props.bottomReducer?.swiperShowRadiostation
                      ?.playingSong?.artist
                  }{" "}
                  {
                    this.props.bottomReducer?.swiperShowRadiostation
                      ?.playingSong?.song
                  }
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                  height: this.props.theme.height / 8,
                }}
              />
            )}
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: this.props.theme.height / 8,
                width: "15%",
                position: "absolute",
                right: 0,
                top: 5,
              }}
              onPress={() => {
                //console.log("preeeeeeeeeeeeeeeeeeeeeeeeeeesssssss");
                this.props.toaddfavorite();
              }}
            >
              {this.props.checkIsFovorite() ? (
                <RedHeart fill="#FF5050" height={19} width={21} />
              ) : (
                <Heart
                  fill={
                    this.props.backgroundColor == "white" ? "#1E2B4D" : "white"
                  }
                  height={21.01}
                  width={23.61}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            ref="rootView"
            style={{
              flexDirection: "row",
              height: this.props.theme.height + 10,

              width: "100%",
            }}
          >
            {this.props.filterReducer.activeIndex > 0 ? (
              <TouchableOpacity
                disabled={this.count == 0}
                onPress={() => {
                  //console.log("left");
                  this.count -= 1;
                  this.swipeLeft();
                }}
                style={[
                  styles.arrow,
                  {
                    marginLeft: 10,
                    marginTop: 30,
                    height: this.props.theme.height / 10,
                    width: this.props.theme.width / 10,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 40,
                    justifyContent: "center",
                    color:
                      this.props.theme.backgroundColor == "white"
                        ? "#0F1E45"
                        : "white",
                  }}
                >
                  {"<"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={[
                  styles.arrow,
                  {
                    marginLeft: 10,
                    marginTop: 30,
                    height: this.props.theme.height / 10,
                    width: this.props.theme.width / 10,
                  },
                ]}
              />
            )}
            <View style={{ marginLeft: 20, marginRight: 50 }}>
              {!this.state.loading &&
                this.props.bottomReducer.swiperShowRadiostation ? (
                <SimpleImage
                  size={180}
                  image={
                    this.props.bottomReducer.swiperShowRadiostation?.data.im
                  }
                />
              ) : (
                <View
                  style={[
                    styles.swiperImage,
                    {
                      backgroundColor:
                        this.props.theme.backgroundColor == "white"
                          ? "#0F1E45"
                          : "white",
                    },
                  ]}
                >
                  <ActivityIndicator size={100} color="#EBEEF7" />
                </View>
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 23,
                      width: 200,
                      justifyContent: "center",
                    }}
                  >
                    {!this.state.loading &&
                      this.props.bottomReducer.swiperShowRadiostation ? (
                      this.props.bottomReducer.swiperShowRadiostation.data?.st.map(
                        (item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                this.changeRadioStancia(item);
                              }}
                              style={
                                item.bi == this.showActiveBi()
                                  ? [styles.numbers, { marginRight: 15 }]
                                  : styles.activeNumbers
                              }
                            >
                              <Text style={styles.activenumber}>{item.bi}</Text>
                            </TouchableOpacity>
                          );
                        }
                      )
                    ) : (
                      <View style={{ height: 28 }} />
                    )}
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 20,
                      marginLeft: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          this.props.bottomReducer.selectedRadioStation
                            ?.isPlayingMusic
                        ) {
                          if (this.state.isRecording) {
                            //console.log("onstart");
                            this.props.onStopRecord();
                          } else {
                            this.props.onStartRecord();
                          }
                        }
                        this.setState({ isRecording: !this.state.isRecording });
                      }}
                      style={[
                        styles.btnrecord,
                        {
                          backgroundColor:
                            this.props.theme.backgroundColor == "white"
                              ? "white"
                              : "#0F1E45",
                        },
                      ]}
                    >
                      {this.state.isRecording ? (
                        <RecordSvg width={20} height={20} fill="#FF5050" />
                      ) : (
                        <DisRecordSvg width={20} height={20} />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.recordingTime,
                        {
                          color:
                            this.props.theme.backgroundColor == "white"
                              ? "#0F1E45"
                              : "white",
                        },
                      ]}
                    >
                      {this.props.recordSecs > 0 ? this.props.recordTime : ""}
                    </Text>

                    {this.state.loading ? (
                      <View
                        style={[
                          styles.btnPlay,
                          {
                            backgroundColor:
                              this.props.theme.backgroundColor == "white"
                                ? "#101C3B"
                                : "#0F1E45",
                            marginTop: 5,
                          },
                        ]}
                      >
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          NetInfo.addEventListener(state => {
                           
                            if (state.isConnected) {
                              if (this.state.isRecording) {
                                //console.log("dhkabsakhshakj");
                                this.onStopRecord();
                              }
                              if (
                                this.props.bottomReducer.selectedRadioStation
                                  ?.id ==
                                this.props.bottomReducer.swiperShowRadiostation
                                  ?.id
                              ) {
                               
                              this.props.isPlaying();
                              } else {
                                player._pouseMusic();
                                this.setState({ loading: true });
                                let d = this.props.bottomReducer
                                  .swiperShowRadiostation;
                                d.isPlayingMusic = true;
                                //console.log("ddd", d);
                                this.props.onchangeSelectedRadioStation(d);
                                this.props.onchangeMiniScreenData(d);

                                setTimeout(() => {
                                  this.props._addLookingList(
                                    this.props.bottomReducer
                                      .swiperShowRadiostation?.data
                                  );
                                  player._startPlayMusic(
                                    this.props.bottomReducer
                                      .swiperShowRadiostation?.data,
                                    this.props.bottomReducer
                                      .swiperShowRadiostation?.data.st[0]
                                  );
                                  console.log("22222222222222222222222222222222222222222222222222222222222222");
                                  storeData('activeRadioStation', { ...this.props.bottomReducer.swiperShowRadiostation, isPlayingMusic: true })
                                  if (this.props.settingsReducer.autoPlay) {
                                    storeData("autoPlayData", d)

                                  }
                                  this.setState({
                                    swiperIndex: this.count,
                                    loading: false,
                                  });
                                }, 500);
                              }
                            }else{
                              this.props.onchangeIsConnected(state.isConnected);
                            }
                          })



                        }}
                        style={[
                          styles.btnPlay,
                          {
                            backgroundColor:
                              this.props.theme.backgroundColor == "white"
                                ? "#101C3B"
                                : "#0F1E45",
                          },
                        ]}
                      >
                        {this.props.bottomReducer.selectedRadioStation?.id ==
                          this.props.bottomReducer.swiperShowRadiostation?.id &&
                          this.props.bottomReducer.selectedRadioStation
                            ?.isPlayingMusic ? (
                          <Stop width={26.66} height={37} fill="white" />
                        ) : (
                          <PlaySvG width={26.66} height={37} fill="white" />
                        )}
                      </TouchableOpacity>
                    )}
                    {this.props.bottomReducer.swiperShowRadiostation?.data
                      .pl ? (
                      <TouchableOpacity
                        disabled={
                          !this.props.bottomReducer.swiperShowRadiostation?.data
                            .pl
                        }
                        style={[
                          styles.btnrecord,
                          {
                            backgroundColor:
                              this.props.theme.backgroundColor == "white"
                                ? "white"
                                : "#0F1E45",
                          },
                        ]}
                        onPress={() => {
                          this._navigatePlayList();
                        }}
                      >
                        <InfoSvg
                          width={29.91}
                          height={24.22}
                          fill={
                            this.props.theme.backgroundColor == "white"
                              ? "#1E2B4D"
                              : "white"
                          }
                        />
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={[
                          {
                            width: 68,
                            height: 68,
                          },
                        ]}
                      />
                    )}
                  </View>
                </View>
              </View>
              {this.props.bottomReducer.activeArrow &&
                listPlayer && this.count < listPlayer.length - 1 && (
                  <TouchableOpacity
                    style={[
                      styles.arrow,
                      {
                        marginTop: 20,
                        height: this.props.theme.height / 10,
                        width: this.props.theme.width / 10,
                      },
                    ]}
                    disabled={
                      this.props.bottomReducer.activeIndex ==
                      this.props.menuReducer.menuData.length - 1
                    }
                    onPress={() => {
                      //console.log("right");
                      this.count += 1;
                      this.swipeRight();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 40,
                        justifyContent: "center",
                        color:
                          this.props.theme.backgroundColor == "white"
                            ? "#0F1E45"
                            : "white",
                      }}
                    >
                      {">"}
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
  _onPanResponderMove(event, gestureState) {
    const dy = gestureState.dy + (!this.close ? 0 : this.buttomValue);
    if (dy < 0) return;
    if (!this.state.startDrag) {
      this.setState({ startDrag: true });
    }
    Animated.timing(this.state.swipeAnimation, {
      toValue: dy,
      duration: 0,
      useNativeDriver: true,
    }).start(this.fadeIn());

    return;
  }

  move(moveTo) {
    Animated.timing(this.state.swipeAnimation, {
      toValue: moveTo,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }
  _onPanResponderRelease(event, gestureState) {
    const delta = this.buttomValue;
    this.setState({ startDrag: false });

    if (gestureState.dy > 0) {
      this.move(delta);
      this.close = true;
    } else {
      this.showFull();
      this.close = false;
    }

    return;
  }

  showFull(value) {
    this.count = 0
    this.fadeOut();
    //console.log("lfkdfk");
    Animated.timing(this.state.swipeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    this.close = false
    console.log("sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    if (value) {
      this.setState({ visible: false, loading: true, close: false });
      setTimeout(() => {
        console.log(value);
        this.props.onchangeSwiperShowStation(value);
        this.props.get_songData(value.radioStation);
        this.setState({ loading: false });
      }, 50);
    }
  }
  showMini() {
    this.setState({ close: true });
    //this.close = true
    this.fadeIn();
    this.move(this.buttomValue);
  }
  renderDisConectModal() {
    return (
      <Modal
        isVisible={!this.props.backgroundColor.isConnected}
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
        backdropOpacity={0.2}
        onBackdropPress={() => {
          this.setState({ visibleModal: false });
        }}
      >
        {
          <View style={{ backgroundColor: "white", height: 200, padding: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
              Нет подключения к интернету{" "}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 20 }}>
              Подключите соединение или мобильный интернет для прослушивания
              радиостанций{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.onchangeIsConnected(true);
                setTimeout(() => {
                  NetInfo.fetch().then((state) => {
                    if (
                      this.props.bottomReducer.selectedRadioStation
                        .isPlayingMusic && state.isConnected
                    ) {
                      this.props.isPlaying();
                    }
                    this.props.onchangeIsConnected(state.isConnected);
                  }, 50000);
                });
              }}
              style={{ marginTop: 25, width: "100%", alignItems: "flex-end" }}
            >
              <Text style={{ color: "green", fontSize: 17 }}>
                Перепадключится
              </Text>
            </TouchableOpacity>
          </View>
        }
      </Modal>
    );
  }
  showActiveBi() {
    if (
      this.props.bottomReducer.swiperShowRadiostation?.data.id ==
      this.props.bottomReducer.selectedRadioStation?.data.id
    ) {
      return this.props.bottomReducer.selectedRadioStation?.activeBi.bi;
    } else {
      return this.props.bottomReducer.swiperShowRadiostation?.data.st[0].bi;
    }
  }
  swipeLeft() {
    console.log(this.props.filterReducer.activeIndex);
    let listPlayer = this.props.playListReducer.swiperListType == 'main' ? this.props.menuReducer.menuData
      : this.props.menuReducer.filterData
    if (this.props.filterReducer.activeIndex > 0) {
      let radiostation = {
        data: listPlayer[
          this.props.filterReducer.activeIndex - 1
        ],
        isPlayingMusic: false,
        activeBi: listPlayer[
          this.props.filterReducer.activeIndex - 1
        ].st[0],
        id: listPlayer[
          this.props.filterReducer.activeIndex - 1
        ].id,
        index: this.props.filterReducer.activeIndex - 1,
      };
      if (this.timerHandle) {
        clearTimeout(this.timerHandle);
      }
      this.props.onchangeSwiperShowStation({
        radioStation: radiostation,
        index: this.props.filterReducer.activeIndex - 1,
        isPlayingMusic: this.props.bottomReducer.selectedRadioStation
          .isPlayingMusic,
      });
      this.timerHandle = setTimeout(() => {
        this.props.get_songData(radiostation);
      }, 800);

      if (this.props.settingsReducer.autoPlay) {
        this.setState({
          swiperIndex: this.count - 1,
        });
      }
    }
  }
  swipeRight() {
    console.log("----", this.props.filterReducer.activeIndex, this.props.playListReducer.swiperListType);
    let listPlayer = this.props.playListReducer.swiperListType == 'main' ? this.props.menuReducer.menuData
      : this.props.menuReducer.filterData
    if (this.count < listPlayer.length) {
      let radiostation = {
        data: listPlayer[
          this.props.filterReducer.activeIndex + 1
        ],
        isPlayingMusic: false,
        activeBi: listPlayer[
          this.props.filterReducer.activeIndex + 1
        ].st[0],
        id: listPlayer[
          this.props.filterReducer.activeIndex + 1
        ].id,
        index: this.props.filterReducer.activeIndex + 1,
      };
      if (this.timerHandle) {
        clearTimeout(this.timerHandle);
      }
      this.props.onchangeSwiperShowStation({
        radioStation: radiostation,
        index: this.props.filterReducer.activeIndex + 1,
        isPlayingMusic: this.props.bottomReducer.selectedRadioStation
          .isPlayingMusic,
      });

      this.timerHandle = setTimeout(() => {
        // this.setState({loading:true})

        this.props.get_songData(radiostation);
      }, 800);

      if (this.props.settingsReducer.autoPlay) {
        this.setState({
          swiperIndex: this.count + 1,
        });
      }
    }
  }
  changeRadioStancia(item) {
    this.setState({ loading: true })


    if (
      this.props.bottomReducer.swiperShowRadiostation?.id ==
      this.props.bottomReducer.selectedRadioStation?.id
    ) {
      this.props.onchangeActiveBi({ ... this.props.bottomReducer.swiperShowRadiostation, activeBi: item });
      player._pouseMusic();
      //setTimeout(() => {
      player._startPlayMusic(
        this.props.bottomReducer.swiperShowRadiostation?.data,
        this.props.bottomReducer.swiperShowRadiostation?.activeBi
      ).then(() => {
        this.setState({ loading: false })


    //    setTimeout(() => {
          this.props.onchangeSelectedRadioStationPlaying(true);
          console.log('333333333333333333333333333333333333333333333333333333333333333333333');
          storeData('activeRadioStation', { ...this.props.bottomReducer.selectedRadioStation, isPlayingMusic: true })

         

     //   }, 2500);

        storeData("autoPlayData", this.props.bottomReducer.swiperShowRadiostation)
      })

      // }, 500);
    } else {
      let data = this.props.bottomReducer.swiperShowRadiostation;
      data.isPlayingMusic = true;
      data.activeBi = item;

      player._pouseMusic();
      this.props.onchangeSelectedSatationbyBi(data);
      // this.props.onchangeSelectedRadioStation(data)

      //setTimeout(() => {
      this.props._addLookingList(
        this.props.bottomReducer.swiperShowRadiostation?.data
      );
      player._startPlayMusic(
        this.props.bottomReducer.swiperShowRadiostation?.data,
        this.props.bottomReducer.swiperShowRadiostation?.activeBi
      ).then(() => {
        this.setState({ loading: true })
        setTimeout(() => {
          this.props.onchangeSelectedRadioStationPlaying(true);
          console.log('444444444444444444444444444444444444444444444444');
          if (this.props.settingsReducer.reconnect) {
            storeData('activeRadioStation', { ...this.props.bottomReducer.selectedRadioStation, isPlayingMusic: true })
          }
          this.setState({ loading: false });

        }, 2500);

        storeData("autoPlayData", this.props.bottomReducer.swiperShowRadiostation)
      })

      // }, 500);
    }
  }
  renderBottomSheet() {
    let listPlayer = this.props.playListReducer.swiperListType == 'main' ? this.props.menuReducer.menuData
      : this.props.menuReducer.filterData
    return (
      <View style={{ height: "100%" }}>
        <View
          //  {...this._panResponder.panHandlers}
          style={{
            flexDirection: "row",

            justifyContent: "space-between",
            backgroundColor: this.props.backgroundColor,
          }}
        >
          <TouchableOpacity
            style={{
              height: 70,
              width: "80%",
              justifyContent: "center",
              paddingLeft: 20,
            }}
            onPress={() => {
              this.showMini();
              this.move(this.buttomValue);
            }}
          >
            <Arrow
              fill={this.props.backgroundColor == "white" ? "#1E2B4D" : "white"}
              height={10.59}
              width={19.8}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 70,
              width: "20%",
              backgroundColor: this.props.backgroundColor,
              right: 0,
            }}
            onPress={() => {
              //console.log("preeeeeeeeeeeeeeeeeeeeeeeeeeesssssss");
              this.props.toaddfavorite();
            }}
          >
            {this.props.checkIsFovorite() ? (
              <RedHeart fill="#FF5050" height={19} width={21} />
            ) : (
              <Heart
                fill={
                  this.props.backgroundColor == "white" ? "#1E2B4D" : "white"
                }
                height={21.01}
                width={23.61}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          /// {...this._panResponder.panHandlers}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            backgroundColor: this.props.backgroundColor,
          }}
        >
          {!this.state.loading &&
            this.props.bottomReducer.swiperShowRadiostation ? (
            <Text
              numberOfLines={1}
              style={{
                color:
                  this.props.backgroundColor == "white" ? "#1E2B4D" : "white",
                fontSize: 24,
                fontWeight: "500",
                width: 200,
                textAlign: "center",
              }}
            >
              {this.props.bottomReducer.swiperShowRadiostation.data?.pa}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            height: this.props.theme.height - 50,

            backgroundColor: this.props.theme.backgroundColor,
          }}
        >
          <View
            style={{
              paddingBottom: 80,
            }}
          >
            <BackGroundSvg
              width={this.props.theme.width}
              style={{ position: "absolute", top: -160 }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {this.props.filterReducer.activeIndex > 0 ? (
                <TouchableOpacity
                  disabled={this.state.loading}
                  onPress={() => {
                    //console.log("left");
                    this.count -= 1;
                    this.swipeLeft();
                  }}
                  style={[
                    styles.arrow,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      justifyContent: "center",
                      color:
                        this.props.theme.backgroundColor == "white"
                          ? "grey"
                          : "white",
                    }}
                  >
                    {"<"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.arrow,

                  ]}
                />
              )}

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {!this.state.loading &&
                  this.props.bottomReducer.swiperShowRadiostation ? (
                  <SimpleImage
                    size={180}
                    image={
                      this.props.bottomReducer.swiperShowRadiostation.data.im
                    }
                  />
                ) : (
                  <View style={styles.swiperImage}>
                    <ActivityIndicator size={100} color="#EBEEF7" />
                  </View>
                )}
              </View>
              {listPlayer && this.props.filterReducer.activeIndex < listPlayer.length - 1 ? (
                <TouchableOpacity
                  style={[styles.arrow]}
                  disabled={this.state.loading}
                  onPress={() => {
                    console.log("right", this.count);
                    this.count += 1;
                    this.swipeRight();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      justifyContent: "center",
                      color:
                        this.props.theme.backgroundColor == "white"
                          ? "grey"
                          : "white",
                    }}
                  >
                    {">"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.arrow} />
              )}
            </View>
            {!this.state.loading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      this.props.theme.backgroundColor == "white"
                        ? "#1E2B4D"
                        : "white",
                    fontSize: 17,
                    width: 250,
                    textAlign: "center",
                  }}
                >
                  {
                    this.props.bottomReducer?.swiperShowRadiostation
                      ?.playingSong?.artist
                  }{" "}
                  {
                    this.props.bottomReducer?.swiperShowRadiostation
                      ?.playingSong?.song
                  }
                </Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                  height: 25,
                }}
              />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 23,
              }}
            >
              {!this.state.loading &&
                this.props.bottomReducer.swiperShowRadiostation ? (
                this.props.bottomReducer.swiperShowRadiostation.data.st.map(
                  (item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={this.state.loading}
                        onPress={() => {
                          this.changeRadioStancia(item);
                        }}
                        style={
                          item.bi == this.showActiveBi()
                            ? [styles.numbers, { marginRight: 15 }]
                            : styles.activeNumbers
                        }
                      >
                        <Text style={styles.activenumber}>{item.bi}</Text>
                      </TouchableOpacity>
                    );
                  }
                )
              ) : (
                <View style={{ height: 28 }} />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{ marginTop: 11 }}>
              <TouchableOpacity
                disabled={
                  !this.props.bottomReducer.selectedRadioStation?.isPlayingMusic
                }
                onPress={() => {
                  if (
                    this.props.bottomReducer.selectedRadioStation
                      ?.isPlayingMusic
                  ) {
                    if (this.state.isRecording) {
                      //console.log("onstart");
                      this.props.onStopRecord();
                    } else {
                      this.props.onStartRecord();
                    }
                  }
                  this.setState({ isRecording: !this.state.isRecording });
                }}
                style={[
                  styles.btnrecord,
                  {
                    zIndex: 0,
                    backgroundColor:
                      this.props.theme.backgroundColor == "white"
                        ? "white"
                        : "#0F1E45",
                  },
                ]}
              >
                {this.state.isRecording ? (
                  <RecordSvg width={20} height={20} fill="#FF5050" />
                ) : (
                  <DisRecordSvg width={20} height={20} />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.recordingTime,
                  {
                    color:
                      this.props.theme.backgroundColor == "white"
                        ? "#0F1E45"
                        : "white",
                  },
                ]}
              >
                {this.props.recordSecs > 0 ? this.props.recordTime : ""}
              </Text>
            </View>
            {this.state.loading || this.props.loadingBi ? (
              <View
                style={[
                  styles.btnPlay,
                  {
                    backgroundColor:
                      this.props.theme.backgroundColor == "white"
                        ? "#101C3B"
                        : "#0F1E45",
                    marginTop: 5,
                  },
                ]}
              >
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <TouchableOpacity
              onPress={() => {
                NetInfo.addEventListener(state => {
                 
                  if (state.isConnected) {
                    if (this.state.isRecording) {
                      //console.log("dhkabsakhshakj");
                      this.onStopRecord();
                    }
                    if (
                      this.props.bottomReducer.selectedRadioStation
                        ?.id ==
                      this.props.bottomReducer.swiperShowRadiostation
                        ?.id
                    ) {
                      this.props.isPlaying();
                    } else {
                      player._pouseMusic();
                      this.setState({ loading: true });
                      let d = this.props.bottomReducer
                        .swiperShowRadiostation;
                      d.isPlayingMusic = true;
                      //console.log("ddd", d);
                      this.props.onchangeSelectedRadioStation(d);
                      this.props.onchangeMiniScreenData(d);

                      setTimeout(() => {
                        this.props._addLookingList(
                          this.props.bottomReducer
                            .swiperShowRadiostation?.data
                        );
                        player._startPlayMusic(
                          this.props.bottomReducer
                            .swiperShowRadiostation?.data,
                          this.props.bottomReducer
                            .swiperShowRadiostation?.data.st[0]
                        );
                        console.log("22222222222222222222222222222222222222222222222222222222222222");
                        storeData('activeRadioStation', { ...this.props.bottomReducer.swiperShowRadiostation, isPlayingMusic: true })
                        if (this.props.settingsReducer.autoPlay) {
                          storeData("autoPlayData", d)

                        }
                        this.setState({
                          swiperIndex: this.count,
                          loading: false,
                        });
                      }, 500);
                    }
                  }else{
                    this.props.onchangeIsConnected(state.isConnected);
                  }
                })



              }}
                style={[
                  styles.btnPlay,
                  {
                    backgroundColor:
                      this.props.theme.backgroundColor == "white"
                        ? "#101C3B"
                        : "#0F1E45",
                    marginTop: 5,
                  },
                ]}
              >
                {this.props.bottomReducer.selectedRadioStation?.id ==
                  this.props.bottomReducer.swiperShowRadiostation?.id &&
                  this.props.bottomReducer.selectedRadioStation
                    ?.isPlayingMusic ? (
                  <Stop width={24} height={27} fill="white" />
                ) : (
                  <PlaySvG width={26.66} height={37} fill="white" />
                )}
              </TouchableOpacity>
            )}
            {this.props.bottomReducer.swiperShowRadiostation?.data.pl ? (
              <TouchableOpacity
                disabled={
                  !this.props.bottomReducer.swiperShowRadiostation?.data.pl
                }
                style={[
                  styles.btnrecord,
                  {
                    backgroundColor:
                      this.props.theme.backgroundColor == "white"
                        ? "white"
                        : "#0F1E45",
                    marginTop: calcHeight(10),
                  },
                ]}
                onPress={() => {
                  this.move(this.buttomValue);
                  this.props._navigatePlayList();
                }}
              >
                <InfoSvg
                  width={29.91}
                  height={24.22}
                  fill={
                    this.props.theme.backgroundColor == "white"
                      ? "#1E2B4D"
                      : "white"
                  }
                />
              </TouchableOpacity>
            ) : (
              <View
                style={[
                  {
                    marginTop: calcHeight(10),
                    width: 68,
                    height: 68,
                  },
                ]}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { itemMini, itemFull, style } = this.props;
    const { collapsed } = this.state;
    return (
      <View
        style={{ position: "absolute", flex: 1, height: "100%", width: "100%" }}
      >
        {this.state.startDrag ? (
          <View
            style={{ backgroundColor: "#0005", height: "100%", width: "100%" }}
          ></View>
        ) : null}
        <Animated.View
          {...this._panResponder.panHandlers}
          ref={(ref) => (this.viewRef = ref)}
          style={[
            styles.wrapSwipe,

            {
              flex: 1,
              //height: deviceHeight-50,
              marginTop: MARGIN_TOP + 56,
              top: 0,
              transform: [{ translateY: this.state.swipeAnimation }],
              backgroundColor: this.props.theme.backgroundColor,
            },

            !itemMini && collapsed && { marginBottom: -100 },
            style,
          ]}
        >
          <Animated.View
            style={[
              styles.bottomHeader,
              {
                backgroundColor:
                  this.props.backgroundColor == "white" ? "#EBEEF7" : "#0F1E45",
              },
              {
                opacity: this.state.fadeAnim, // Bind opacity to animated value
              },
            ]}
            visible={this.state.visible}
          >
            <View
              {...this._panResponder.panHandlers}
              onTouchEnd={() => {
                this.move(0);
                this.fadeOut();
                this.close = false;
              }}
              onTouchStart={() => {
                this.count = 0
                this.setState({ close: false });
                if (this.props.bottomReducer.selectedRadioStation && this.props.bottomReducer.selectedRadioStation.isPlayingMusic) {
                  console.log(this.props.bottomReducer.selectedRadioStation);
                  this.props.onchangeSwiperShowStation({
                    radioStation: this.props.bottomReducer.selectedRadioStation,
                    index: this.props.filterReducer.activeIndex - 1,
                    isPlayingMusic: this.props.bottomReducer.selectedRadioStation
                      .isPlayingMusic,
                  });
                }

              }}
              style={{
                height: 86,
                width: "70%",
                backgroundColor:
                  this.props.backgroundColor == "white" ? "#EBEEF7" : "#0F1E45",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingLeft: 25,
                  justifyContent: "space-between",
                  paddingRight: 12,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {this.props.bottomReducer.miniScreenData?.data?.im && (
                    <SimpleImage
                      size={57}
                      image={this.props.bottomReducer.miniScreenData.data.im}
                    />
                  )}
                  <View style={{ marginLeft: 15 }}>
                    <Text
                      style={[
                        styles.txtTitle,
                        {
                          color:
                            this.props.backgroundColor == "white"
                              ? "#1D2A4B"
                              : "white",
                        },
                      ]}
                    >
                      {this.props.bottomReducer.miniScreenData?.data?.pa}
                    </Text>
                    {this.props.bottomReducer.miniScreenData?.playingSong && (
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.txtTitle,
                          {
                            fontSize: 12,
                            marginTop: 5,
                            width: 160,
                            color:
                              this.props.backgroundColor == "white"
                                ? "#1D2A4B"
                                : "white",
                          },
                        ]}
                      >
                        {
                          this.props.bottomReducer.miniScreenData.playingSong
                            .artist
                        }
                        {
                          this.props.bottomReducer.miniScreenData.playingSong
                            .song
                        }
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            {itemMini}
          </Animated.View>

          {!this.state.close && (
            <View
              style={{
                height: deviceHeight,
                width: "100%",
                position: "absolute",
              }}
            >
              {this.props.theme.albomeMode
                ? this.renderBottomSheetHorizontal()
                : this.renderBottomSheet()}
            </View>
          )}
        </Animated.View>
      </View>
    );
  }
}
const mapStateToProps = ({
  filterReducer,
  menuReducer,
  favorites,
  theme,
  settingsReducer,
  bottomReducer,
  playListReducer
}) => {
  return {
    filterReducer,
    menuReducer,
    favorites,
    theme,
    settingsReducer,
    bottomReducer,
    playListReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onchangeSwiperShowStation: (payload) => {
      dispatch(changeSwiperShowStation(payload));
    },
    get_songData: (payload) => {
      dispatch(getSongData(payload));
    },
    onchangeSelectedRadioStation: (payload) => {
      dispatch(changeSelectedRadioStation(payload));
    },
    onchangeMiniScreenData: (payload) => {
      dispatch(changeMiniScreenData(payload));
    },
    onchangeSelectedSatationbyBi: (payload) => {
      dispatch(changeSelectedSatationbyBi(payload));
    },
    onchangeActiveBi: (payload) => {
      dispatch(changeSwiperActiveBi(payload));
    },
    onchangeSelectedRadioStationPlaying: (payload) => {
      dispatch(changeSelectedRadioStationPlaying(payload));
    },
    onchangeIsConnected: (payload) => {
      dispatch(changeIsConnected(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SwipeUpDown);
const styles = StyleSheet.create({
  wrapSwipe: {
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  bottomSheet: {
    width: 40,
    height: 70,
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 25,
    zIndex: 1,
  },
  swiperImage: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.19,
    shadowRadius: 4.65,
    height: 180,
    width: 180,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignItems: "center",
    backgroundColor: "white",
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },
  shadowContent: {
    height: calcHeight(86),
    elevation: 10,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  panResponderView: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    //height: calcHeight(86),
    backgroundColor: "yellow",
  },
  wrapper: {
    backgroundColor: "red",
  },
  slide1: {
    // flex:1,
    height: calcHeight(86),
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: calcWidth(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    // height: calcHeight(86),
    elevation: 25,
    // marginTop: calcHeight(-28),
  },

  row: {
    flexDirection: "row",

    alignItems: "center",
  },
  bottomSheet: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: calcHeight(20),
    width: "80%",
  },
  numbers: {
    height: 28,
    width: 47,
    backgroundColor: "#101C3B",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activenumber: {
    color: "#8B95AF",
    fontSize: 14,
    fontWeight: "500",
  },
  btnPlay: {
    width: 85,
    height: 85,
    backgroundColor: "#101C3B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    marginHorizontal: 28,
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
    height: 28,
    width: 47,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 15,
    elevation: 5,
  },
  albImg: {
    height: calcHeight(257),
    marginTop: calcHeight(24),
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    height: calcHeight(269.03),
    width: calcWidth(265),
    borderRadius: calcWidth(8),
  },
  btnrecord: {
    width: 68,
    height: 68,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Roboto",
    color: "#1D2A4B",
  },
  player: {
    backgroundColor: "white",
    width: 54,
    height: 54,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  modalView: {
    height: calcHeight(50),
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#F3F4F5",
    paddingHorizontal: 29,
  },
  modalItem: {
    fontSize: 15,
    fontWeight: "500",
  },
  modalMenuRadio: {
    backgroundColor: "white",
    height: calcHeight(560),
    marginHorizontal: calcWidth(45),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    //  paddingLeft: calcWidth(22),
    height: calcHeight(170),
    marginTop: -20,
    justifyContent: "center",
    width: calcWidth(80),
    zIndex: 1,
    alignItems: "center",
    // backgroundColor:'red'
  },
  recordingTime: {
    marginTop: calcHeight(10),
  },
});
