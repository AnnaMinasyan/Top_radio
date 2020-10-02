import React from 'react';
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
import { connect } from "react-redux"
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
import Swiper from 'react-native-swiper'

import { swipeDirections } from "react-native-swipe-gestures"
import { Dimensions } from 'react-native';
import BackSvg from "../assets/icons/backgraundHorizontal.svg"
import SlidingUpPanel from 'rn-sliding-up-panel';

TrackPlayer.registerPlaybackService(() => require('../../service'));

interface Props {
    onCloseStart(): void;
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,
    toaddfavorite(type: any): void;
    onchangeswipeablePanelActive(type: any): void;
    onchangePlayingData(type: any): void;
    isFavorite: boolean,
    playUrl: string,
    theme: any
    chnageplayUrl(type: any): void;
    ongetPlayList(type: any): void;
    onchangePlayingMusic(type: boolean): void;
    settingsReducer: any,
    activeIndex: number,
    onchangeplayItem(payload: any): void;
    onchangeSwiperData(payload: any): void;
    onchangeActiveIndex(payload: number): void;
    menuReducer: any
    list: any
}
interface IState {
    menuStyle: boolean,
    isRecording: boolean,
    activBi: number,
    activeHeader: boolean,
    orientation: string,
    startValue: any,
    endValue: any,
    duration: number,
    headerHeight: boolean,
    backBttVelosity: boolean,
    activSwichItem: any,
    swiperIndex: number,
    swiperactiveIndex: number,
    swipeList: any,
    gestureName: string
}
class Bottom extends React.Component<Props, IState> {
    swiperRef: any
    constructor(props: Props) {
        super(props)

        this.state = {
            menuStyle: true,
            isRecording: false,
            activBi: 0,
            activeHeader: true,
            orientation: '',
            startValue: new Animated.Value(1),
            endValue: 0,
            duration: 5000,
            headerHeight: true,
            backBttVelosity: false,
            swiperIndex: 0,
            activSwichItem: null,
            swiperactiveIndex: 0,
            swipeList: [],
            gestureName: 'none'
        }


    }


    modalHeight = Dimensions.get('window').height - deviceHeight + calcHeight(86)//278//42 * Dimensions.get('window').height / 100 - 20

    modalHeightOpen = Dimensions.get('window').height - calcHeight(24)
    modalWidth = Dimensions.get('window').width
    modalWidthOpen = Dimensions.get('window').width
    modalHeightAnim = new Animated.Value(this.modalHeight)
    modalWidthAnim = new Animated.Value(this.modalWidth)
    _panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
        },
        onPanResponderMove: (evt, gestureState) => {
            this.modalHeightAnim.setValue(Dimensions.get('window').height - gestureState.moveY + 30)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (Math.abs(gestureState.dx) < 50 && Math.abs(gestureState.dy) < 50) {
                if (this.modalHeightAnim._value == this.modalHeight) {
                    console.log("ehoesfhefhepfhepfhipei");

                    this.swipeAnimationOpen()
                    this.props.onchangeswipeablePanelActive(!this.props.filterReducer.swipeablePanelActive)

                    this.setState({ headerHeight: false })
                    if (this.props.settingsReducer.autoPlay && !this.props.filterReducer.isPlayingMusic) {
                        this._startPlayMusic()
                        this.props.onchangePlayingMusic(true)
                    }
                }
                else {
                    console.log("fjjjjjjjjjjjjjjjjjjjjjjjj");

                    this.props.onchangeswipeablePanelActive(false)

                    this.swipeAnimationClose()
                }
            }
            else if (gestureState.moveY < 500) {
                console.log("gestureState.moveY < 500");

                this.props.onchangeswipeablePanelActive(false)
                this.swipeAnimationClose()
                this.setState({ headerHeight: false })
            }
            else {
                console.log("gestureState.moveY < 500elseeeee");

                this.props.onchangeswipeablePanelActive(false)
                this.swipeAnimationClose()

            }

        },
        onPanResponderTerminate: (evt, gestureState) => {
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            return true;
        },
    });

    swipeAnimationClose() {
        Animated.parallel([
            Animated.timing(                  // Animate over time
                this.modalHeightAnim,            // The animated value to drive
                {
                    toValue: this.modalHeight,
                    duration: 200,              // Make it take a while
                }
            ),
            Animated.timing(
                this.modalWidthAnim,
                {
                    toValue: this.modalWidth,
                    duration: 150
                })
        ]).start(() => {
            this.setState({
                arrowUp: true,
                backBttVelosity: false
            })
        });
    }

    swipeAnimationOpen() {
        if (this.props.settingsReducer.autoPlay && !this.props.filterReducer.isPlayingMusic) {
            this._startPlayMusic()
            this.props.onchangePlayingMusic(true)
        }

        Animated.parallel([
            Animated.timing(
                // Animate over time
                this.modalHeightAnim,            // The animated value to drive
                {
                    toValue: this.modalHeightOpen,
                    duration: 200,              // Make it take a while
                }
            ),
            Animated.timing(
                this.modalWidthAnim,
                {
                    toValue: this.modalWidthOpen,
                    duration: 150
                }),

        ]).start(() => {

            this.setState({
                arrowUp: false,
                backBttVelosity: true
            })
        });


    }
    isPortrait = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({ orientation: 'portrait' });
        }
        else {
            this.setState({ orientation: 'landscape' });
        }

    };
    renderBottomSheetheader = () => {
        return <View style={[styles.bottomHeader, {
            backgroundColor: this.props.theme.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45',
        }]}>
            <View
                onTouchStart={() => {
                    this._panel.show()
                    this.props.onchangeswipeablePanelActive(true)
                }}
                style={{
                    height: calcHeight(86), width: calcWidth(270),
                    backgroundColor: this.props.theme.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45',
                }}>
                <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <SimpleImage size={calcWidth(47)} image={this.props.menuReducer.playItem.im} />
                        <View style={{ marginLeft: calcHeight(15) }}>
                            <Text style={[styles.txtTitle, { color: this.props.theme.backgroundColor == "white" ? "#1D2A4B" : 'white', }]}>{this.props.menuReducer.playItem.pa}</Text>
                            {this.props.filterReducer.playListType ? <Text
                                style={[styles.txtTitle,
                                { fontSize: calcFontSize(12), marginTop: calcHeight(5), width: calcWidth(200), color: this.props.theme.backgroundColor == "white" ? "#1D2A4B" : 'white' }]}>
                                {this.props.filterReducer.playListType.artist} {this.props.filterReducer.playListType.song}</Text> : null}
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    style={global_styles.searchbtn}
                    onPress={() => {
                        this.props.toaddfavorite(this.props.menuReducer.playItem)
                    }}
                >
                    {this.props.isFavorite ?
                        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                        <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.player,
                    { backgroundColor: this.props.theme.backgroundColor == "white" ? 'white' : '#0D1834' }]}
                    onPress={() => {
                        this.isPlaying()
                        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                    }}
                >
                    {this.props.filterReducer.isPlayingMusic ? <Stop width={calcWidth(16)} height={calcHeight(22)} fill={this.props.theme.backgroundColor == "white" ? '#101C3B' : 'white'} /> :
                        <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill={this.props.theme.backgroundColor == "white" ? '#101C3B' : 'white'} />}
                </TouchableOpacity>
            </View>
        </View>
    }
    async _pouseMusic() {
        const playerState = await TrackPlayer.getState();
        if (this.props.filterReducer.isPlayingMusic) {
            console.log("playMusic");
            await TrackPlayer.play();
        } else {
            console.log("_pouseMusic");
            await TrackPlayer.pause();
        }
    }

    async _startPlayMusic() {


        const playerState = await TrackPlayer.getState();
        console.log("----------------------------", playerState);

        if (
            playerState == 1 || playerState == 3
        ) {
            console.log('destroying..', this.props.menuReducer.playMusicData.st);
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: "local-track",
                //url: this.props.playUrl ? this.props.playUrl : Array.isArray(this.props.menuReducer.playItem.st) ? this.props.menuReducer.playItem.st[0].ur : this.props.menuReducer.playItem.st,

                url: this.props.menuReducer.playMusicData.st[0].ur,
                title: this.props.filterReducer.playListType.song,
                artist: this.props.filterReducer.playListType.artist,
                artwork: 'https://top-radio.ru/assets/image/radio/180/' + this.props.menuReducer.playItem.im,

            });

            await TrackPlayer.play();
        } else {
            this._pouseMusic()
        }
    };
    changeRadioStancia(item: any) {
        this.props.chnageplayUrl(item.ur)
        this.setState({ activBi: item.bi })
        if (this.props.filterReducer.isPlayingMusic) {
            this._pouseMusic()
            this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
            setTimeout(() => {
                this._startPlayMusic()
                this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
            }, 500);
        }

    }
    _navigatePlayList() {
        if (this.state.activSwichItem) {
            if (this.state.activSwichItem.pl) {
                this.props.ongetPlayList(this.state.activSwichItem)
                this.props.navigation.navigate('PlayList')
                this.props.onchangeswipeablePanelActive(false)
            }

        } else if (this.props.menuReducer.playItem.pl) {
            this.props.ongetPlayList(this.props.menuReducer.playItem)
            this.props.navigation.navigate('PlayList')
            this.props.onchangeswipeablePanelActive(false)
        }
    }

    componentWillReceiveProps() {
        console.log("oooooooooooooo", this.props.filterReducer.swipeablePanelActive);

        if (this.props.filterReducer.swipeablePanelActive) {
            console.log("::::::::::::::::::::::::::::::::::::");

            this._panel.show()
        }

        this.setState({
            swiperactiveIndex: this.props.menuReducer.activeIndex
        })
    }
    async componentDidMount() {

        this.isPortrait();
        Dimensions.addEventListener('change', () => {
            this.isPortrait();
        });
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_STOP,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
            //  alwaysPauseOnInterruption: false,
        });
        await TrackPlayer.reset();
        //await TrackPlayer.add(tracks);
        await TrackPlayer.play();
        this.setState({ activBi: this.props.menuReducer.playItem.st[0].bi })
    }
    isPlaying() {
        if (this.props.filterReducer.isPlayingMusic) {
            this._pouseMusic()
        } else {
            this._startPlayMusic()
        }
        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
    }
    renderBottomSheetHorizontal() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        console.log("kueyriidyomrpwipr");

        return <SafeAreaView >
            <StatusBar barStyle='light-content'

                backgroundColor={this.props.theme.backgroundColor} /><View
                    style={{
                        backgroundColor: this.props.theme.backgroundColor,
                        height: deviceHeight > deviceWidth ? deviceWidth : deviceHeight, width: deviceHeight > deviceWidth ? deviceHeight : deviceWidth
                    }}>
                <BackSvg />
                <View ref="rootView" style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: calcHeight(45.48),
                    position: 'absolute'
                }}>
                    <GestureRecognizer
                        onSwipe={(direction, state) => this.onSwipe(direction, state)}
                        config={config}
                        style={{
                            flex: 1,

                        }}
                    >
                        <View ref="rootView" style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: calcHeight(45.48),
                        }}>
                            <View style={{
                                width: '48%', flexDirection: 'row',
                            }}>
                                <TouchableOpacity
                                    style={styles.arrow}
                                    onPress={() => {
                                        this.props.onchangeswipeablePanelActive(false)
                                    }}>
                                    <Arrow fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                                </TouchableOpacity>
                                <View>
                                    <View style={{ alignItems: 'center' }}>

                                        <Text style={{
                                            color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                                            fontSize: calcFontSize(24),
                                            fontWeight: '500'
                                        }}>{this.props.menuReducer.filterData[this.state.swiperactiveIndex].pa}</Text>
                                    </View>

                                    <View style={styles.albImg}>
                                        <SimpleImage size={calcHeight(257)} image={this.props.menuReducer.filterData[this.state.swiperactiveIndex].im} />
                                    </View>

                                </View>
                            </View>

                            <View style={{ width: '48%', flexDirection: 'row' }}>
                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        {this.props.filterReducer.playListType ?
                                            <Text

                                                style={{
                                                    color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                                                    fontSize: calcFontSize(17),
                                                    width: calcWidth(150),
                                                    alignItems: 'center',
                                                    paddingLeft: calcWidth(20)
                                                }}>
                                                {this.props.filterReducer.playListType.artist}  {this.props.filterReducer.playListType.song}
                                            </Text> : null}
                                        {this.renderBis()}

                                        <View style={{
                                            alignItems: 'center', marginTop: calcHeight(40),
                                            flexDirection: 'row', justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ isRecording: !this.state.isRecording })
                                                }}
                                                style={[styles.btnrecord,
                                                { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                            >
                                                {this.props.menuReducer.playItem.isRecording ?
                                                    <RecordSvg width={calcHeight(20)} height={calcHeight(20)} fill='#FF5050' /> :
                                                    <DisRecordSvg width={calcHeight(20)} height={calcHeight(20)} />

                                                }
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (this.state.activSwichItem != null && this.state.activSwichItem.id != this.props.menuReducer.playItem.id) {
                                                        this.props.onchangePlayingData(this.state.activSwichItem)
                                                        this._pouseMusic()
                                                        this.props.onchangeplayItem(this.state.activSwichItem)
                                                        setTimeout(() => {
                                                            this._startPlayMusic()
                                                            this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                                                        }, 500);
                                                        //this.isPlaying()
                                                    } else {
                                                        this.isPlaying()
                                                    }

                                                }}
                                                style={[styles.btnPlay,
                                                { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}>
                                                {this.props.filterReducer.isPlayingMusic ? <Stop width={calcHeight(24)} height={calcHeight(27)} fill='white' /> :
                                                    <PlaySvG width={calcHeight(26.66)} height={calcHeight(37)} fill='white' />}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                disabled={!this.props.menuReducer.playItem.pl}
                                                style={[styles.btnrecord,
                                                { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                                onPress={() => {
                                                    this._navigatePlayList()
                                                }}>
                                                <InfoSvg width={calcHeight(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        height: calcHeight(70),
                                        width: calcWidth(40),
                                        marginTop: -20,
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        this.props.toaddfavorite(this.props.menuReducer.playItem)
                                    }}>
                                    {this.props.isFavorite ?
                                        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                                        <Heart fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                    </GestureRecognizer>


                </View>

            </View>

        </SafeAreaView >
    }
    renderBis() {
        let stList = []
        if (this.state.activSwichItem) {
            stList = this.state.activSwichItem.st
        } else
            if (Array.isArray(this.props.menuReducer.playItem.st)) { stList = this.props.menuReducer.playItem.st }

        return <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
        }>
            {
                stList ?
                    stList.map((item: any, index: number) => {
                        return <TouchableOpacity
                            key={index}
                            onPress={() => {
                                this.changeRadioStancia(item)

                            }}
                            style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                        >
                            <Text style={styles.activenumber}>{item.bi}</Text>
                        </TouchableOpacity>
                    }) : null
            }
        </View >

    }

    onSwipe(gestureName: any, gestureState: any) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

        this.setState({ gestureName: gestureName });
        switch (gestureName) {

            case SWIPE_LEFT:
                console.log("SWIPE_LEFT");
                if (this.state.swiperactiveIndex < this.props.menuReducer.filterData.length) {
                    this.setState({
                        swiperactiveIndex: this.state.swiperactiveIndex + 1,
                        activBi: this.props.menuReducer.filterData[this.state.swiperactiveIndex + 1].st[0].bi
                    });
                    this.props.onchangeActiveIndex(this.props.menuReducer.activeIndex + 1)

                    this.props.onchangePlayingData(this.props.menuReducer.filterData[this.state.swiperactiveIndex + 1])

                    if (this.props.filterReducer.isPlayingMusic && this.state.swiperactiveIndex + 1 == this.props.menuReducer.activeIndex) {
                        this.props.onchangePlayingMusic(true)
                    } else {

                        this.props.onchangePlayingMusic(false)
                    }
                }

                break;
            case SWIPE_RIGHT:
                console.log("SWIPE_RIGHT");
                if (this.state.swiperactiveIndex > 0) {
                    this.setState({
                        swiperactiveIndex: this.state.swiperactiveIndex - 1,
                        activBi: this.props.menuReducer.filterData[this.state.swiperactiveIndex - 1].st[0].bi
                    });
                    this.props.onchangePlayingData(this.props.menuReducer.filterData[this.state.swiperactiveIndex - 1])
                    this.props.onchangeActiveIndex(this.props.menuReducer.activeIndex - 1)

                    if (this.props.filterReducer.isPlayingMusic && this.state.swiperactiveIndex - 1 == this.props.menuReducer.activeIndex) {
                        this.props.onchangePlayingMusic(true)
                    } else {

                        this.props.onchangePlayingMusic(false)
                    }
                } else {
                    if (this.props.filterReducer.isPlayingMusic && this.props.menuReducer.activeIndex == 0) {
                        this.props.onchangePlayingMusic(true)
                    } else {

                        this.props.onchangePlayingMusic(false)
                    }
                    this.setState({ swiperactiveIndex: 0 });

                }
                break;
        }
    }
    renderBottomSheet() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return <SafeAreaView   >
            <StatusBar barStyle={this.props.filterReducer.swipeablePanelActive == true && this.props.theme.backgroundColor == "white" ? 'dark-content' : 'light-content'}
                backgroundColor={this.props.filterReducer.swipeablePanelActive == true ? this.props.theme.backgroundColor : '#0F1E45'} />
            <View
                style={{
                    backgroundColor: this.props.theme.backgroundColor,
                    height: deviceHeight, width: deviceWidth + 10,
                    zIndex: 999,

                }}>

                {this.props.filterReducer.swipeablePanelActive == false ? this.renderBottomSheetheader() :
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            onTouchStart={() => {
                                console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL");
                                
                                this._panel.hide()
                            }}
                            style={[styles.bottomSheet, { height: calcHeight(70) }]}>
                            <View
                                // {...this._panResponder.panHandlers}
                                style={{
                                    paddingLeft: calcWidth(26),
                                    height: calcHeight(70),
                                    //  justifyContent: 'center',
                                    width: calcWidth(80),

                                }}
                            >
                                <Arrow fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                            </View>

                        </View>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: calcHeight(70),
                                width: calcWidth(80),
                            }}
                            onPress={() => {
                                this.props.toaddfavorite(this.props.menuReducer.playItem)
                            }}>
                            {this.props.isFavorite ?
                                <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                                <Heart fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                        </TouchableOpacity>
                    </View>
                }
                <View style={{
                    height: calcHeight(460


                    ), zIndex: 0
                }}>
                    <GestureRecognizer
                    
                        onSwipe={(direction, state) => this.onSwipe(direction, state)}
                        config={config}
                        style={{
                            flex: 1,

                        }}
                    >
                        <View
                            style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {this.props.menuReducer.filterData[this.state.swiperactiveIndex] ?
                                <Text style={{
                                    color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                                    fontSize: calcFontSize(24),
                                    fontWeight: '500'
                                }}>{this.props.menuReducer.filterData[this.state.swiperactiveIndex].pa}</Text> : null}
                        </View>
                        <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: calcHeight(-120) }} />
                        <View

                            style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
                            <SimpleImage size={calcHeight(257)} image={this.props.menuReducer.filterData[this.state.swiperactiveIndex].im} />
                        </View>
                        </GestureRecognizer>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: calcWidth(20),
                        }}>
                            {this.props.menuReducer.filterData[this.state.swiperactiveIndex].pa == this.props.menuReducer.playItem.pa && this.props.filterReducer.playListType ?
                                <Text style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>
                                    {this.props.filterReducer.playListType.artist}  {this.props.filterReducer.playListType.song}
                                </Text> : null}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
                        }></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
                        }>
                            {
                                this.props.menuReducer.filterData[this.state.swiperactiveIndex].st.map((item: any, index: number) => {
                                    return <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            this.changeRadioStancia(item)

                                        }}
                                        style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                                    >
                                        <Text style={styles.activenumber}>{item.bi}</Text>
                                    </TouchableOpacity>
                                })
                            }
                        </View>

                   

                    {/* <Swiper
                        showsPagination={false}
                        loop={false}
                        ref={(ref: any) => {
                            this.swiperRef = ref;

                        }}
                        // index={this.props.menuReducer.activeIndex==0?this.props.menuReducer.activeIndex-4:0}
                        onIndexChanged={(index) => {
                            this.setState({
                                activSwichItem: this.props.menuReducer.swipeList[index],
                                activBi: this.props.menuReducer.swipeList[index].st[0].bi
                            })
                            if (index == this.props.menuReducer.activeIndex + 14) {


                                this.setState({ swiperactiveIndex: this.props.menuReducer.activeIndex + 14 })
                                this.props.onchangeActiveIndex(this.props.menuReducer.activeIndex + 14)
                            }
                            if (this.props.filterReducer.isPlayingMusic && index == this.props.menuReducer.activeIndex) {
                                this.props.onchangePlayingMusic(true)
                            } else {

                                this.props.onchangePlayingMusic(false)
                            }
                        }}
                    >
                        {
                            this.state.swipeList.map((data: any, key: number) => {
                                return <View
                                    key={key}
                                >

                                    <View
                                        style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        {data ?
                                            <Text style={{
                                                color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                                                fontSize: calcFontSize(24),
                                                fontWeight: '500'
                                            }}>{data.pa}</Text> : null}
                                    </View>
                                    <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: calcHeight(-120) }} />
                                    <View

                                        style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
                                        <SimpleImage size={calcHeight(257)} image={data.im} />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: calcWidth(20),
                                    }}>
                                        {data.pa == this.props.menuReducer.playItem.pa && this.props.filterReducer.playListType ? <Text style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>
                                            {this.props.filterReducer.playListType.artist}  {this.props.filterReducer.playListType.song}
                                        </Text> : null}
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
                                    }>
                                        {
                                            data.st.map((item: any, index: number) => {
                                                return <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        this.changeRadioStancia(item)

                                                    }}
                                                    style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                                                >
                                                    <Text style={styles.activenumber}>{item.bi}</Text>
                                                </TouchableOpacity>
                                            })
                                        }*/}
                    {/* </View> */}
                    {/* {this.renderBis()} 
                                </View>
                            {/* })
                        }
                    </Swiper> */}
                </View>

                <View style={{
                    alignItems: 'center', marginTop: calcHeight(20), flexDirection: 'row', justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ isRecording: !this.state.isRecording })
                        }}
                        style={[styles.btnrecord,
                        { zIndex: 0, backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                    >
                        {this.props.menuReducer.playItem.isRecording ?
                            <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' /> :
                            <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} />

                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.activSwichItem != null && this.state.activSwichItem.id != this.props.menuReducer.playItem.id) {
                                this._pouseMusic()
                                this.props.onchangeplayItem(this.props.menuReducer.filterData[this.state.swiperactiveIndex])
                                setTimeout(() => {
                                    this._startPlayMusic()
                                    this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                                }, 500);

                            } else {
                                this.isPlaying()
                            }

                        }}
                        style={[styles.btnPlay,
                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}>
                        {this.props.filterReducer.isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                            <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!this.props.menuReducer.playItem.pl}
                        style={[styles.btnrecord, { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                        onPress={() => {
                            this._navigatePlayList()
                        }}>
                        <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                    </TouchableOpacity>
                </View>
                {/* </GestureRecognizer> */}


            </View>


        </SafeAreaView >
    }

    render() {
        Dimensions.addEventListener('change', () => {
            console.log("chnageee");

            this.isPortrait();
        });
        console.log("this.props.filterReducer.swipeablePanelActive", this.props.filterReducer.swipeablePanelActive)
        return (
            <SlidingUpPanel
                onDragStart={() => {
                    if (this.props.filterReducer.swipeablePanelActive == false) {
                        this.props.onchangeswipeablePanelActive(true)

                    }
                }}
                allowDragging={false}
                onBottomReached={() => {
                    this.props.onchangeswipeablePanelActive(false)
                }

                }
                backdropStyle={{ backgroundColor: 'green' }}
                draggableRange={{ top: deviceHeight - calcHeight(21), bottom: calcHeight(86) }}
                ref={c => this._panel = c}
                friction={0.0001}
            >
                {this.renderBottomSheet()}

            </SlidingUpPanel>
            // <View
            //     style={[
            //         styles.container,
            //     ]}>

            //      <Animated.View style={[styles.shadowContent,
            //     {
            //         height: this.modalHeightAnim,
            //         width: this.modalWidthAnim,
            //     }
            //     ]}> 
            //     {this.state.orientation == 'portrait' ? this.renderBottomSheet() : this.renderBottomSheetHorizontal()}
            //     </Animated.View>
            // </View>
        );
    }
};
const mapStateToProps = ({ filterReducer, favorites, theme, settingsReducer, menuReducer }: any) => {
    return { filterReducer, favorites, theme, settingsReducer, menuReducer }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        onchangeFavoriteType: () => {
            dispatch(changeFavoriteType())
        },
        toaddfavorite: (payload: any) => {
            dispatch(addFavorites(payload))
        },
        onchangeswipeablePanelActive: (payload: boolean) => {
            dispatch(changeswipeablePanelActive(payload))
        },
        ongetPlayList: (payload: any) => {
            dispatch(getPlayList(payload))
        },
        onchangePlayingMusic: (payload: any) => {
            dispatch(changePlayingMusic(payload))
        },
        onchangeActiveIndex: (payload: number) => {
            dispatch(changeActiveIndex(payload))
        },
        onchangeplayItem: (payload: any) => {
            dispatch(changeplayItem(payload))
        },
        onchangePlayingData: (payload: any) => {
            dispatch(changePlayingData(payload))
        },
        onchangeSwiperData: (payload: any) => {
            dispatch(changeSwiperData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Bottom);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
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
    wrapper: {
        backgroundColor: 'red'
    },
    slide1: {
        // flex:1,
        height: calcHeight(86),

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
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    bottomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: calcWidth(12),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        // height: calcHeight(86),
        elevation: 25,
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
});