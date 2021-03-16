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
  changePlayingData,
  changeActiveIndex,
  changeActiveBi,
  getSongData,
  changeSelectedRadioStation,
  changeMiniScreenData,
  changeSwiperShowStation,
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

const MARGIN_TOP = Platform.OS === "ios" ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get("window").height+calcHeight(55)
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
  onchangeSelectedRadioStationPlaying(payload: any): void;
  _addLookingList(payload: any): void;
  _navigatePlayList(): void;
};
class SwipeUpDown extends Component<Props> {
  static defautProps = {
    disablePressToShow: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      fadeAnim: new Animated.Value(0),
      animHeader: new Animated.Value(1),
      visible: false,
      loading: true,
    };
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
    this.checkCollapsed = true;
    this.showFull = this.showFull.bind(this);
    this.count=0
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

    //this.setState({visible:false})
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this),
    });
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
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
    this.viewRef.setNativeProps(this.customStyle);
  }
  renderBottomSheetHorizontal() {
    return (
      <ImageBackground 
      resizeMode={'stretch'}
      source={require('../assets/images/img.png')} 
      style={{width:this.props.theme.width,height:this.props.theme.height*0.8}}>
        <View >
        <View
          {...this._panResponder.panHandlers}
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: this.props.theme.height/8,
              width: "13%",
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <Arrow
              fill={this.props.backgroundColor == "white" ? "#1E2B4D" : "white"}
              height={10.59}
              width={19.8}
            />
          </View>
          <View
            {...this._panResponder.panHandlers}
            style={{
              height: 60,
              width: 200,
              paddingTop:20
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
            {...this._panResponder.panHandlers}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
                height: this.props.theme.height/8,
                paddingTop:20,
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
                  width:  this.props.theme.width/2.6,
                  textAlign: "center",
                }}
              >
                {
                  this.props.bottomReducer?.swiperShowRadiostation?.playingSong
                    ?.artist
                }{" "}
                {
                  this.props.bottomReducer?.swiperShowRadiostation?.playingSong
                    ?.song
                }
              </Text>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
                height:  this.props.theme.height/8,
              }}
            />
          )}
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height:  this.props.theme.height/8,
              width: "15%",
              position: "absolute",
              right: 0,
              top:5
            }}
            onPress={() => {
              console.log("preeeeeeeeeeeeeeeeeeeeeeeeeeesssssss");
              this.props.toaddfavorite();
            }}
          >
            {this.props.checkIsFovorite() ? (
              <RedHeart
                fill="#FF5050"
                height={19}
                width={21}
              />
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
           
            width:'100%'
          }}
        >
          {this.props.filterReducer.activeIndex > 0 ? (
            <TouchableOpacity
              disabled={this.count == 0}
              onPress={() => {
                console.log("left");
                this.count -= 1;
                this.swipeLeft();
              }}
              style={[styles.arrow, { marginLeft: 10, marginTop: 30,height: this.props.theme.height/10,width:this.props.theme.width/10}]}
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
            style={[styles.arrow, { marginLeft: 10, marginTop: 30,height: this.props.theme.height/10,width:this.props.theme.width/10 }]}
            />
          )}
         <View style={{ marginLeft:20, marginRight:50}}>
         {!this.state.loading &&
          this.props.bottomReducer.swiperShowRadiostation ? (
            <SimpleImage
              size={180}
              image={this.props.bottomReducer.swiperShowRadiostation?.data.im}
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                    <View style={{height:28}} />
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
                            console.log("onstart");
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
                      {this.state.recordSecs > 0 ? this.state.recordTime : ""}
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
                        if (this.props.bottomReducer.isConnected) {
                          if (this.state.isRecording) {
                            console.log("dhkabsakhshakj");
                            this.onStopRecord();
                          }
                          if (
                            this.props.bottomReducer.selectedRadioStation?.id ==
                            this.props.bottomReducer.swiperShowRadiostation?.id
                          ) {
                            this.props.isPlaying();
                          } else {
                            player._pouseMusic();
                            this.setState({ loading: true });
                            let d = this.props.bottomReducer
                              .swiperShowRadiostation;
                            d.isPlayingMusic = true;
                            console.log("ddd", d);
                            this.props.onchangeSelectedRadioStation(d);
                            this.props.onchangeMiniScreenData(d);

                            setTimeout(() => {
                              this.props._addLookingList(
                                this.props.bottomReducer.swiperShowRadiostation
                                  ?.data
                              );
                              player._startPlayMusic(
                                this.props.bottomReducer.swiperShowRadiostation
                                  ?.data,
                                this.props.bottomReducer.swiperShowRadiostation
                                  ?.data.st[0]
                              );
                              this.setState({
                                swiperIndex: this.count,
                                loading: false,
                              });
                            }, 500);
                          }
                        } else {
                          console.log(";;;;;;;;;;;;;;;;;;;;");
                          this.props.onchangeIsConnected(false);
                        }
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
                </View>
              </View>
            </View>
            {this.props.bottomReducer.activeArrow &&
              this.count < this.props.menuReducer.menuData?.length - 1 && (
                <TouchableOpacity
                  style={[styles.arrow, { marginTop: 20,height: this.props.theme.height/10,width:this.props.theme.width/10 }]}
                  disabled={
                    this.props.bottomReducer.activeIndex ==
                    this.props.menuReducer.menuData.length - 1
                  }
                  onPress={() => {
                    console.log("right");
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
   // console.log(gestureState.dy,deviceHeight-deviceHeight/5);
  if(this.props.theme.albomeMode){
    if (
      gestureState.dy > 0 &&
      !this.checkCollapsed &&
      gestureState.dy < deviceHeight-deviceHeight/5
    ) {
    // console.log("downnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      // SWIPE DOWN
      this.customStyle.style.top = this.top + gestureState.dy;
      this.height = DEVICE_HEIGHT;
      !this.state.collapsed && this.setState({ collapsed: true });
      this.updateNativeProps();
    } else if (
      this.checkCollapsed &&
      gestureState.dy < 0 &&
      gestureState.dy > -(DEVICE_HEIGHT - 180)
    ) {
      //   console.log("uppppppppppppppppppppppppppppppppppppppp",-(DEVICE_HEIGHT-50));
      // console.log( this.customStyle.style.top,"this.customStyle.style.top");
      // SWIPE UP
      this.top = 0;
      this.customStyle.style.top = DEVICE_HEIGHT - 180 + gestureState.dy;
      this.customStyle.style.height = this.SWIPE_HEIGHT - gestureState.dy;
      this.fadeOut();
      this.state.collapsed && this.setState({ collapsed: false });

      this.updateNativeProps();
  }
   } else{
   console.log(",mtaaaaaaaaaaaaaaaaav");
    if (
      gestureState.dy > 0 &&
      !this.checkCollapsed &&
      gestureState.dy < DEVICE_HEIGHT
    ) {
      // console.log("downnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      // SWIPE DOWN
      this.customStyle.style.top = this.top + gestureState.dy;
      this.height = DEVICE_HEIGHT;
      !this.state.collapsed && this.setState({ collapsed: true });
      this.updateNativeProps();
    } else if (
      this.checkCollapsed &&
      gestureState.dy < 0 &&
      gestureState.dy > -(DEVICE_HEIGHT - 180)
    ) {
      //   console.log("uppppppppppppppppppppppppppppppppppppppp",-(DEVICE_HEIGHT-50));
      // console.log( this.customStyle.style.top,"this.customStyle.style.top");
      // SWIPE UP
      this.top = 0;
      this.customStyle.style.top = DEVICE_HEIGHT - 180 + gestureState.dy;
      this.customStyle.style.height = this.SWIPE_HEIGHT - gestureState.dy;
      this.fadeOut();
      this.state.collapsed && this.setState({ collapsed: false });

      this.updateNativeProps();
    }
   }
 // }
  }

  _onPanResponderRelease(event, gestureState) {
    console.log('/////////////////////////',gestureState.dy);
    this.fadeIn();
    if(this.props.theme.albomeMode){
      console.log(gestureState.dy);
      if (gestureState.dy < 20 || gestureState.dy < 200) {
        this.showFull();
      } else {
        this.showMini();
      }
    }else{ 
      if (gestureState.dy < -100 || gestureState.dy < 100) {
      this.showFull();
    } else {
      this.showMini();
    }}
   
  }

  showFull(value) {
     this.fadeOut()
    const { onShowFull } = this.props;
    this.customStyle.style.top = 0;
    this.customStyle.style.height = DEVICE_HEIGHT;

    this.updateNativeProps();
    this.state.collapsed && this.setState({ collapsed: false, visible: false });
    this.checkCollapsed = false;
    onShowFull && onShowFull();

    
    if (value) {
      this.setState({ visible: false, loading: true });
      setTimeout(() => {
       
          this.props.onchangeSwiperShowStation(value);
          this.props.get_songData(value.radioStation);
          this.setState({ loading: false });
     
      }, 50);
    }
  }
 componentWillReceiveProps(){
  
     console.log(";djjjjjjjjjjjjjjjjjjjjjjj");
     if(this.props.theme.albomeMode){
      console.log("22222222222222222");
      if(this.customStyle.style.top && this.state.visible){
        console.log("0000000000000000000000000000000");
       this.customStyle.style.top= this.props.theme.height - this.SWIPE_HEIGHT+calcHeight(50)
      }
     
     }else{
      console.log("1111111111111");
      if(this.customStyle.style.top && this.state.visible){
        console.log("kffffffffffffffffffffffffffffffffffffffffffffffff");
       this.customStyle.style.top=this.props.theme.height- this.props.theme.height/3 
      }
     }
    // this.customStyle.style.top =this.props.theme.albomeMode?
    // this.props.theme.height- this.props.theme.height/3 :this.props.theme.height - this.SWIPE_HEIGHT+calcHeight(50)
    // this.updateNativeProps();
  
 }
  showMini() {
    console.log("-----------------------------------");
    this.fadeIn();
    if(this.props.theme.albomeMode){
      const { onShowMini, itemMini } = this.props;
      this.customStyle.style.top = itemMini
        ?  this.props.theme.height- this.props.theme.height/3 
        : 30;
      this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
      this.props.theme.height - this.SWIPE_HEIGHT+calcHeight(50)
      !this.state.collapsed && this.setState({ collapsed: true, visible: true });
      this.checkCollapsed = true;
      onShowMini && onShowMini();
    }
    else{const { onShowMini, itemMini } = this.props;
    this.customStyle.style.top = itemMini
      ? this.props.theme.height - this.SWIPE_HEIGHT+calcHeight(50)
      : this.props.theme.height;
    this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
    this.updateNativeProps();
    !this.state.collapsed && this.setState({ collapsed: true, visible: true });
    this.checkCollapsed = true;
    onShowMini && onShowMini();}
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
          <View style={{ backgroundColor: "white", height: 150, padding: 10 }}>
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
                    console.log("djdkjslakdjad9uao9du0fagbasf.");
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
      this.props.bottomReducer.swiperShowRadiostation?.id ==
      this.props.bottomReducer.selectedRadioStation?.id
    ) {
      return this.props.bottomReducer.selectedRadioStation?.activeBi.bi;
    } else {
      return this.props.bottomReducer.swiperShowRadiostation?.data.st[0].bi;
    }
  }
  swipeLeft() {
    if (this.count > 0) {
      let radiostation = {
        data: this.props.menuReducer.filterData[
          this.props.filterReducer.activeIndex - 1
        ],
        isPlayingMusic: false,
        activeBi: this.props.menuReducer.filterData[
          this.props.filterReducer.activeIndex -1
        ].st[0],
        id: this.props.menuReducer.filterData[
          this.props.filterReducer.activeIndex - 1
        ].id,
        index:this.props.filterReducer.activeIndex - 1
      };
      if (this.timerHandle) {
        clearTimeout(this.timerHandle);
      }
      this.props.onchangeSwiperShowStation({
        radioStation: radiostation,
        index: this.props.filterReducer.activeIndex - 1,
        isPlayingMusic: this.props.bottomReducer.selectedRadioStation.isPlayingMusic,
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
    if (this.count < this.props.menuReducer.filterData.length - 1) {
      let radiostation = {
        data: this.props.menuReducer.filterData[
          this.props.filterReducer.activeIndex + 1
        ],
        isPlayingMusic: false,
        activeBi: this.props.menuReducer.filterData[
          this.props.filterReducer.activeIndex + 1
        ].st[0],
        id: this.props.menuReducer.filterData[
          this.props.filterReducer.activeIndex + 1
        ].id,
        index:this.props.filterReducer.activeIndex - 1
      };
      if (this.timerHandle) {
        clearTimeout(this.timerHandle);
      }
      this.props.onchangeSwiperShowStation({
        radioStation: radiostation,
        index: this.props.filterReducer.activeIndex + 1,
        isPlayingMusic: this.props.bottomReducer.selectedRadioStation.isPlayingMusic,
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
  renderBottomSheet() {
    return (
      <View>
      <View
      {...this._panResponder.panHandlers} 
     style={{
       flexDirection: "row",
      
       justifyContent: "space-between",
  backgroundColor: this.props.backgroundColor
     }}
   >
    
       <View   

        style={{height:70, width:'80%',  justifyContent:'center', paddingLeft:20}}>
         <Arrow
           fill={
             this.props.backgroundColor == "white"
               ? "#1E2B4D"
               : "white"
           }
           height={10.59}
           width={19.8}
         />
       </View>
    
     <TouchableOpacity
       style={{
         justifyContent: "center",
         alignItems: "center",
         height: (70),
         width: "20%",
            backgroundColor:this.props.backgroundColor,
         position:'absolute',
         right:0
       }}
       onPress={() => {
         console.log("preeeeeeeeeeeeeeeeeeeeeeeeeeesssssss");
         this.props.toaddfavorite();
       }}
     >
       {this.props.checkIsFovorite() ? (
         <RedHeart
           fill="#FF5050"
           height={(19)}
           width={(21)}
         />
       ) : (
         <Heart
           fill={
             this.props.backgroundColor == "white"
               ? "#1E2B4D"
               : "white"
           }
           height={(21.01)}
           width={(23.61)}
         />
       )}
     </TouchableOpacity>
   </View>
   <View
   {...this._panResponder.panHandlers} 
     style={{
       justifyContent: "center",
       alignItems: "center",
       height: 50,
       backgroundColor: this.props.backgroundColor,
     }}
   >
     {!this.state.loading  && this.props.bottomReducer.swiperShowRadiostation ? (
       <Text
         numberOfLines={1}
         style={{
           color:
             this.props.backgroundColor == "white"
               ? "#1E2B4D"
               : "white",
           fontSize: 24,
           fontWeight: "500",
           width: 200,
           textAlign: "center",
         }}
       >
         {this.props.bottomReducer.swiperShowRadiostation.data.pa}
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
              alignItems: "center",
            }}
          >
            {this.props.filterReducer.activeIndex > 0 ? (
              <TouchableOpacity
                disabled={this.state.loading}
                onPress={() => {
                  console.log("left");

                  this.swipeLeft();
                }}
                style={[styles.arrow,{width:this.props.theme.width/3.5}]}
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
              <View style={[styles.arrow,{width:this.props.theme.width/3.5}]} />
            )}

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {!this.state.loading &&  this.props.bottomReducer.swiperShowRadiostation? (
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
            {this.props.filterReducer.activeIndex <
            this.props.menuReducer.filterData.length - 1 ? (
              <TouchableOpacity
                style={styles.arrow}
                disabled={
                  this.state.loading
                }
                onPress={() => {
                  console.log("right");
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
              {!this.state.loading ?
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
                this.props.bottomReducer?.swiperShowRadiostation?.playingSong
                  ?.artist
              }{" "}
              {
                this.props.bottomReducer?.swiperShowRadiostation?.playingSong
                  ?.song
              }
            </Text>
          </View>:<View style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 20,
              height:25
            }}/>}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 23,
            }}
          >
            { !this.state.loading &&this.props.bottomReducer.swiperShowRadiostation ?
              this.props.bottomReducer.swiperShowRadiostation.data.st.map(
                (item: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      disabled={
                        this.state.loading
                      }
                      onPress={() => {
                        this.props.changeRadioStancia(item);
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
              ):<View style={{height: 28}}/>}
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
                  this.props.bottomReducer.selectedRadioStation?.isPlayingMusic
                ) {
                  if (this.state.isRecording) {
                    console.log("onstart");
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
              {this.state.recordSecs > 0 ? this.state.recordTime : ""}
            </Text>
          </View>
          {this.state.loading ? (
            <View
              style={[
                styles.btnPlay,
                {
                  backgroundColor:
                    this.props.theme.backgroundColor == "white"
                      ? "#101C3B"
                      : "#0F1E45",
                  marginTop: (5),
                },
              ]}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (this.props.bottomReducer.isConnected) {
                  if (this.state.isRecording) {
                    console.log("dhkabsakhshakj");
                    this.onStopRecord();
                  }
                  if (
                    this.props.bottomReducer.selectedRadioStation?.id ==
                    this.props.bottomReducer.swiperShowRadiostation?.id
                  ) {
                    this.props.isPlaying();
                  } else {
                    player._pouseMusic();
                    this.setState({ loading: true });
                    let d = this.props.bottomReducer.swiperShowRadiostation;
                    d.isPlayingMusic = true;
                    console.log("ddd", d);
                    this.props.onchangeSelectedRadioStation(d);
                    this.props.onchangeMiniScreenData(d);

                    setTimeout(() => {
                      this.props._addLookingList(
                        this.props.bottomReducer.swiperShowRadiostation?.data
                      );
                      player._startPlayMusic(
                        this.props.bottomReducer.swiperShowRadiostation?.data,
                        this.props.bottomReducer.swiperShowRadiostation?.data
                          .st[0]
                      );
                      this.setState({
                        swiperIndex: this.count,
                        loading: false,
                      });
                    }, 500);
                  }
                } else {
                  console.log(";;;;;;;;;;;;;;;;;;;;");
                  this.props.onchangeIsConnected(false);
                }
              }}
              style={[
                styles.btnPlay,
                {
                  backgroundColor:
                    this.props.theme.backgroundColor == "white"
                      ? "#101C3B"
                      : "#0F1E45",
                  marginTop: (5),
                },
              ]}
            >
              {this.props.bottomReducer.selectedRadioStation?.id ==
                this.props.bottomReducer.swiperShowRadiostation?.id &&
              this.props.bottomReducer.selectedRadioStation?.isPlayingMusic ? (
                <Stop
                  width={(24)}
                  height={(27)}
                  fill="white"
                />
              ) : (
                <PlaySvG
                  width={(26.66)}
                  height={(37)}
                  fill="white"
                />
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            disabled={!this.props.bottomReducer.swiperShowRadiostation?.data.pl}
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
              this.props._navigatePlayList();
            }}
          >
            <InfoSvg
              width={(29.91)}
              height={(24.22)}
              fill={
                this.props.theme.backgroundColor == "white"
                  ? "#1E2B4D"
                  : "white"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
  
  render() {
    
    const { itemMini, itemFull, style } = this.props;
    const { collapsed } = this.state;
    console.log("tooop",this.customStyle.style.top);
    return (
      <Animated.View
        ref={(ref) => (this.viewRef = ref)}
        style={[
          styles.wrapSwipe,
          {
            height: 0,
            marginTop: MARGIN_TOP + 56,
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
              onTouchStart={() => {}}
              style={{
                height: 86,
                width: "70%",
               
                backgroundColor: this.props.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45',
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
                 {this.props.bottomReducer.miniScreenData && <SimpleImage
                    size={57}
                    image={this.props.bottomReducer.miniScreenData.data.im}
                  />}
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
                      {this.props.bottomReducer.miniScreenData?.data.pa}
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
        
        
          
              <View   
          
              style={{ height: deviceHeight ,width:'100%', position:'absolute' }}>
               
                { this.props.theme.albomeMode?this.renderBottomSheetHorizontal():this.renderBottomSheet()}
                
              </View>
   
        
     
      </Animated.View>
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
}) => {
  return {
    filterReducer,
    menuReducer,
    favorites,
    theme,
    settingsReducer,
    bottomReducer,
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
    flex:1
  },
  bottomSheet: {
 
    width: 40,
    height:(70),
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
    marginTop: calcHeight(-28),
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
    fontSize: calcFontSize(15),
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
