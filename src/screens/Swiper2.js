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
} from "react-native";

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

const MARGIN_TOP = Platform.OS === "ios" ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get("window").height - MARGIN_TOP;
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
};
export default class SwipeUpDown extends Component<Props> {
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

  _onPanResponderMove(event, gestureState) {
    // console.log(gestureState.dy);
    //console.log('====',this.checkCollapsed && gestureState.dy < 0);
    //    this.fadeOut()
    if (
      gestureState.dy > 0 &&
      !this.checkCollapsed &&
      gestureState.dy < DEVICE_HEIGHT
    ) {
      console.log("downnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      // SWIPE DOWN

      this.customStyle.style.top = this.top + gestureState.dy;
      this.height = DEVICE_HEIGHT;
      !this.state.collapsed && this.setState({ collapsed: true });
      this.updateNativeProps();
    } else if (
      this.checkCollapsed &&
      gestureState.dy < 0 &&
      gestureState.dy > -(DEVICE_HEIGHT - 150)
    ) {
    
      // console.log( this.customStyle.style.top,"this.customStyle.style.top");
      // SWIPE UP
      this.top = 0;
      this.customStyle.style.top = DEVICE_HEIGHT - 189.1 + gestureState.dy;
      this.customStyle.style.height = this.SWIPE_HEIGHT - gestureState.dy;
      this.fadeOut();
      this.state.collapsed && this.setState({ collapsed: false });
      console.log(
        "uppppppppppppppppppppppppppppppppppppppp",
        this.customStyle.style.height = this.SWIPE_HEIGHT - gestureState.dy
      );
      this.updateNativeProps();
    }
  }

  _onPanResponderRelease(event, gestureState) {
    this.fadeIn();
    if (gestureState.dy < -100 || gestureState.dy < 100) {
      this.showFull();
    } else {
      this.showMini();
    }
  }

  showFull() {
    // this.fadeOut()
    const { onShowFull } = this.props;
    this.customStyle.style.top = 0;
    this.customStyle.style.height = DEVICE_HEIGHT;

    this.updateNativeProps();
    this.state.collapsed && this.setState({ collapsed: false });
    this.checkCollapsed = false;
    onShowFull && onShowFull();

    this.setState({ visible: false });
  }

  showMini() {
    this.fadeIn();
    const { onShowMini, itemMini } = this.props;
    this.customStyle.style.top = itemMini
      ? DEVICE_HEIGHT - this.SWIPE_HEIGHT
      : DEVICE_HEIGHT;
    this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
    this.updateNativeProps();
    !this.state.collapsed && this.setState({ collapsed: true });
    this.checkCollapsed = true;
    onShowMini && onShowMini();
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
  render() {
    // console.log("wdpa[d",this.props.bottomReducer.selectedRadioStation.isPlayingMusic)
    const { itemMini, itemFull, style } = this.props;
    const { collapsed } = this.state;
    return (
      <Animated.View
        ref={(ref) => (this.viewRef = ref)}
        style={[
          styles.wrapSwipe,
          {
            height: 86,
            marginTop: MARGIN_TOP + 56,
          },
          !itemMini && collapsed && { marginBottom: -100 },
          style,
        ]}
      >
        {this.state.visible ? (
          <View
            style={{
              height: 120,
              paddingTop: 35,

              //  marginTop:-35,
            }}
          >
            <Animated.View
              {...this._panResponder.panHandlers}
              style={[
                styles.bottomHeader,
                {
                  backgroundColor:
                    this.props.backgroundColor == "white"
                      ? "#EBEEF7"
                      : "#0F1E45",
                },
                {
                  opacity: this.state.fadeAnim, // Bind opacity to animated value
                },
              ]}
            >
              <View
                onTouchStart={() => {}}
                style={{
                  height: 86,
                  width: "70%",

                  // backgroundColor: this.props.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45',
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
                    <SimpleImage
                      size={57}
                      image={this.props.bottomReducer.miniScreenData.data.im}
                    />
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
                        {this.props.bottomReducer.miniScreenData.data.pa}
                      </Text>
                      {this.props.bottomReducer.miniScreenData.playingSong && (
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
          </View>
        ) : (
          <View>
            {this.props.orientation ? (
              <View
                style={{
                  height: "100%",
                  backgroundColor: this.props.backgroundColor,
                }}
              >
                <Image
                  style={{
                    backgroundColor: this.props.backgroundColor,
                    alignItems: "center",
                    height: 222,
                    resizeMode: "stretch",
                  }}
                  source={require("../assets/images/img.png")}
                />
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    height: 55,
                    position: "absolute",
                    top: 5,
                  }}
                >
                  <View
                    onTouchEnd={() => {
                      this.showMini();
                    }}
                    style={[styles.bottomSheet, { height: 40, width: 50 }]}
                  >
                    <TouchableOpacity style={styles.bottomSheet}>
                      <Arrow
                        fill={
                          this.props.backgroundColor == "white"
                            ? "#1E2B4D"
                            : "white"
                        }
                        height={10.59}
                        width={19.8}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "60%", flexDirection: "row" }}>
                    <View
                      {...this._panResponder.panHandlers}
                      style={{ alignItems: "center" }}
                    >
                      {this.props.bottomReducer.swiperShowRadiostation ? (
                        <Text
                          numberOfLines={1}
                          style={{
                            color:
                              this.props.backgroundColor == "white"
                                ? "#1E2B4D"
                                : "white",
                            fontSize: 20,
                            fontWeight: "500",
                            width: 200,
                          }}
                        >
                          {
                            this.props.bottomReducer.swiperShowRadiostation
                              ?.data.pa
                          }
                        </Text>
                      ) : null}
                    </View>
                    {this.props.bottomReducer.playingMusicArtistSong && (
                      <View
                        style={{
                          alignItems: "center",
                          width: 300,
                          paddingTop: -5,
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            color:
                              this.props.backgroundColor == "white"
                                ? "#1E2B4D"
                                : "white",
                            fontSize: 17,
                            paddingTop: 1,
                            alignItems: "center",
                            maxWidth: 300,
                          }}
                        >
                          {
                            this.props.bottomReducer.swiperShowRadiostation
                              ?.playingSong?.artist
                          }{" "}
                          {
                            this.props.bottomReducer.swiperShowRadiostation
                              ?.playingSong?.song
                          }
                        </Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{
                      // justifyContent: 'center',
                      alignItems: "center",
                      height: 40,
                      width: "15%",

                      paddingTop: 5,
                    }}
                    onPress={() => {
                      this.props.toaddfavorite();
                    }}
                  >
                    {this.props.checkIsFovorite() ? (
                      <RedHeart fill="#FF5050" height={19} width={21} />
                    ) : (
                      <Heart
                        fill={
                          this.props.backgroundColor == "white"
                            ? "#1E2B4D"
                            : "white"
                        }
                        height={21.01}
                        width={23.61}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                  }}
                >
                  <View
                    onTouchEnd={() => {
                      this.showMini();
                    }}
                    style={[
                      styles.bottomSheet,
                      {
                        height: calcHeight(50),
                        backgroundColor: this.props.backgroundColor,
                      },
                    ]}
                  >
                    <TouchableOpacity style={styles.bottomSheet}>
                      <Arrow
                        fill={
                          this.props.backgroundColor == "white"
                            ? "#1E2B4D"
                            : "white"
                        }
                        height={calcHeight(10.59)}
                        width={calcWidth(19.8)}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    {...this._panResponder.panHandlers}
                    onTouchEnd={() => {
                      this.showMini();
                    }}
                    style={{
                      width: "55%",
                      backgroundColor: this.props.backgroundColor,
                    }}
                  ></View>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: calcHeight(70),
                      width: "20%",
                      //    borderWidth:1
                    }}
                    onPress={() => {
                      this.props.toaddfavorite();
                    }}
                  >
                    {this.props.checkIsFovorite() ? (
                      <RedHeart
                        fill="#FF5050"
                        height={calcHeight(19)}
                        width={calcWidth(21)}
                      />
                    ) : (
                      <Heart
                        fill={
                          this.props.backgroundColor == "white"
                            ? "#1E2B4D"
                            : "white"
                        }
                        height={calcHeight(21.01)}
                        width={calcWidth(23.61)}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    backgroundColor: this.props.backgroundColor,
                  }}
                >
                  {this.props.bottomReducer.swiperShowRadiostation ? (
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

                {itemFull}
              </View>
            )}
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            backgroundColor: "white",
            marginTop: -83,
          }}
        >
          <View
            onTouchEnd={() => {
              this.showMini();
            }}
            style={[
              styles.bottomSheet,
              {
                height: calcHeight(50),
                backgroundColor: this.props.backgroundColor,
              },
            ]}
          >
            <TouchableOpacity style={styles.bottomSheet}>
              <Arrow
                fill={
                  this.props.backgroundColor == "white" ? "#1E2B4D" : "white"
                }
                height={calcHeight(10.59)}
                width={calcWidth(19.8)}
              />
            </TouchableOpacity>
          </View>
          <View
            {...this._panResponder.panHandlers}
            onTouchEnd={() => {
              this.showMini();
            }}
            style={{
              width: "55%",
              backgroundColor: this.props.backgroundColor,
            }}
          ></View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: calcHeight(70),
              width: "20%",
              //    borderWidth:1
            }}
            onPress={() => {
              this.props.toaddfavorite();
            }}
          >
            {this.props.checkIsFovorite() ? (
              <RedHeart
                fill="#FF5050"
                height={calcHeight(19)}
                width={calcWidth(21)}
              />
            ) : (
              <Heart
                fill={
                  this.props.backgroundColor == "white" ? "#1E2B4D" : "white"
                }
                height={calcHeight(21.01)}
                width={calcWidth(23.61)}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            backgroundColor: this.props.backgroundColor,
          }}
        >
          {this.props.bottomReducer.swiperShowRadiostation ? (
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
              {this.props.bottomReducer.swiperShowRadiostation.data.pa}
            </Text>
          ) : null}
        </View>
        {itemFull}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapSwipe: {
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  bottomSheet: {
    height: calcHeight(60),
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "center",
    paddingTop: 5,
    width: "15%",
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
    //     marginTop: -28,
    zIndex: 1,
    //  paddingTop:calcHeight(10)
  },
});
