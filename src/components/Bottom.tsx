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
    changeFavoriteType, changePlayingMusic, changeplayItem,
} from '../store/actions/filterAction'
import { NavigationScreenProp } from 'react-navigation';
import RedHeart from "../assets/icons/redHeart.svg"
import SimpleImage from "./SimpleImage"
import PlaySvG from "../assets/icons/play.svg"
import Stop from "../assets/icons/stop.svg"
import { changeswipeablePanelActive } from '../store/actions/filterAction'
import { changeActiveIndex } from '../store/actions/menuActions'
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

import { swipeDirections } from "react-native-swipe-gestures"
import { Dimensions } from 'react-native';
import BackSvg from "../assets/icons/backgraundHorizontal.svg"
TrackPlayer.registerPlaybackService(() => require('../../service'));

interface Props {
    onCloseStart(): void;
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,
    toaddfavorite(type: any): void;
    onchangeswipeablePanelActive(type: any): void;
    isFavorite: boolean,
    playUrl: string,
    theme: any
    chnageplayUrl(type: any): void;
    ongetPlayList(type: any): void;
    onchangePlayingMusic(type: boolean): void;
    settingsReducer: any,
    activeIndex: number,
    onchangeplayItem(payload: any): void;
    onchangeActiveIndex(payload: number): void;
    menuReducer: any

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
    backBttVelosity: boolean
}
class Bottom extends React.Component<Props, IState> {
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
            backBttVelosity: false
        }

    }
    modalHeight = calcHeight(86)//278//42 * Dimensions.get('window').height / 100 - 20
    modalHeightOpen = Dimensions.get('window').height - 24
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
            if (Math.abs(gestureState.dx) < 20 && Math.abs(gestureState.dy) < 20) {
                if (this.modalHeightAnim._value == this.modalHeight) {
                    this.swipeAnimationOpen()
                    this.setState({ headerHeight: false })
                    if (this.props.settingsReducer.autoPlay && !this.props.filterReducer.isPlayingMusic) {
                        this._startPlayMusic()
                        this.props.onchangePlayingMusic(true)
                    }
                }
                else {
                    this.swipeAnimationClose()
                }
            }
            else if (gestureState.moveY < 500) {
                this.swipeAnimationOpen()
                this.setState({ headerHeight: false })
            }
            else {

                this.swipeAnimationClose()
                this.setState({ headerHeight: true })
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
                {...this._panResponder.panHandlers}

                style={{ height: calcHeight(86), width: calcWidth(270), backgroundColor: this.props.theme.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45', }}>
                <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <SimpleImage size={calcWidth(47)} image={this.props.filterReducer.playItem.im} />
                        <View style={{ marginLeft: calcHeight(15) }}>
                            <Text style={[styles.txtTitle, { color: this.props.theme.backgroundColor == "white" ? "#1D2A4B" : 'white' ,}]}>{this.props.filterReducer.playItem.pa}</Text>
                            {this.props.filterReducer.playListType ? <Text 
                            style={[styles.txtTitle,
                            { fontSize: calcFontSize(12), marginTop: calcHeight(5), width:calcWidth(200),color: this.props.theme.backgroundColor == "white" ? "#1D2A4B" : 'white' }]}>
                                {this.props.filterReducer.playListType.artist} {this.props.filterReducer.playListType.song}</Text> : null}
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    style={global_styles.searchbtn}
                    onPress={() => {
                        this.props.toaddfavorite(this.props.filterReducer.playItem)
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
    // async _startPlayMusic() {
    //     console.log('https://top-radio.ru/assets/image/radio/180/' + this.props.filterReducer.playItem.im);

    //     const currentTrack = await TrackPlayer.getCurrentTrack();
    //     await TrackPlayer.reset();
    //     await TrackPlayer.add({
    //         id: "local-track",
    //         url: this.props.playUrl ? this.props.playUrl : Array.isArray(this.props.filterReducer.playItem.st) ? this.props.filterReducer.playItem.st[0].ur : this.props.filterReducer.playItem.st,
    //         title: this.props.filterReducer.playListType.song,
    //         artist: this.props.filterReducer.playListType.artist,
    //         artwork: 'https://top-radio.ru/assets/image/radio/180/' + this.props.filterReducer.playItem.im,

    //     });

    //     await TrackPlayer.play();
    // }
    async _startPlayMusic() {
       
        
        const playerState = await TrackPlayer.getState();
        console.log("----------------------------",playerState);
        if (
          playerState==1
        ) {
          console.log('destroying..');
          await TrackPlayer.reset();
              await TrackPlayer.add({
                  id: "local-track",
                  url: this.props.playUrl ? this.props.playUrl : Array.isArray(this.props.filterReducer.playItem.st) ? this.props.filterReducer.playItem.st[0].ur : this.props.filterReducer.playItem.st,
                  title: this.props.filterReducer.playListType.song,
                  artist: this.props.filterReducer.playListType.artist,
                  artwork: 'https://top-radio.ru/assets/image/radio/180/' + this.props.filterReducer.playItem.im,
      
              });
      
              await TrackPlayer.play();
        }else{
            this._pouseMusic()
        }
      };
    changeRadioStancia(item: any) {
        this.props.chnageplayUrl(item.ur)
        this.setState({ activBi: item.bi })
        this._pouseMusic()
        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
        setTimeout(() => {
            this._startPlayMusic()
            this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
        }, 500);
    }
    _navigatePlayList() {
        if (this.props.filterReducer.playItem.pl) {
            this.props.ongetPlayList(this.props.filterReducer.playItem.pl)
            this.props.navigation.navigate('PlayList')
            this.props.onchangeswipeablePanelActive(false)
        }
    }

    componentWillReceiveProps() {
        if (this.props.filterReducer.swipeablePanelActive) { this.swipeAnimationOpen() }

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
        await TrackPlayer.add(tracks);
        await TrackPlayer.play();
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

        return <SafeAreaView >
            <StatusBar barStyle={this.props.theme.backgroundColor == "white" ? 'dark-content' : 'light-content'}

                backgroundColor={this.props.theme.backgroundColor} /><View
                    style={{
                        backgroundColor: this.props.theme.backgroundColor,
                        height: deviceWidth, width: deviceHeight
                    }}>
                <BackSvg />
                <View ref="rootView" style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: calcHeight(45.48), position: 'absolute' }}>
                    <View style={{
                        width: '50%', flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            style={{
                                paddingLeft: calcWidth(22),
                                height: calcHeight(70),
                                marginTop: -20,
                                justifyContent: 'center',
                                width: calcWidth(80), zIndex: 1,

                            }}
                            onPress={() => {
                                this.props.onchangeswipeablePanelActive(false)
                            }}>
                            <Arrow fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                        </TouchableOpacity>
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                {this.props.filterReducer.playItem ?
                                    <Text style={{
                                        color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                                        fontSize: calcFontSize(24),
                                        fontWeight: '500'
                                    }}>{this.props.filterReducer.playItem.pa}</Text> : null}
                            </View>

                            <View style={{ height: calcHeight(257), marginTop: calcHeight(24), justifyContent: 'center', alignItems: 'center', }}>
                                <SimpleImage size={calcHeight(257)} image={this.props.filterReducer.playItem.im} />
                            </View>

                        </View>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row' }}>
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {this.props.filterReducer.playListType ?
                                    <Text style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17), width: calcWidth(100) }}>
                                        {this.props.filterReducer.playListType.artist}  {this.props.filterReducer.playListType.song}
                                    </Text> : null}
                                {
                                    Array.isArray(this.props.filterReducer.playItem.st) ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
                                            {this.props.filterReducer.playItem.st ?
                                                this.props.filterReducer.playItem.st.map((item: any) => {
                                                    return <TouchableOpacity
                                                        onPress={() => {
                                                            this.changeRadioStancia(item)
                                                        }}
                                                        style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                                                    >
                                                        <Text style={styles.activenumber}>{item.bi}</Text>
                                                    </TouchableOpacity>
                                                }) : null}
                                        </View> : null
                                }
                                <View style={{ alignItems: 'center', marginTop: calcHeight(40), flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isRecording: !this.state.isRecording })
                                        }}
                                        style={[styles.btnrecord,
                                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                    >
                                        {this.props.filterReducer.playItem.isRecording ?
                                            <RecordSvg width={calcHeight(20)} height={calcHeight(20)} fill='#FF5050' /> :
                                            <DisRecordSvg width={calcHeight(20)} height={calcHeight(20)} />

                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.isPlaying()
                                        }}
                                        style={[styles.btnPlay,
                                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}>
                                        {this.props.filterReducer.isPlayingMusic ? <Stop width={calcHeight(24)} height={calcHeight(27)} fill='white' /> :
                                            <PlaySvG width={calcHeight(26.66)} height={calcHeight(37)} fill='white' />}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={!this.props.filterReducer.playItem.pl}
                                        style={[styles.btnrecord, { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                        onPress={() => {
                                            this._navigatePlayList()
                                        }}>
                                        <InfoSvg width={calcHeight(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{ alignItems: 'center', height: calcHeight(70), width: calcWidth(80), marginTop: -20, justifyContent: 'center' }}
                            onPress={() => {
                                this.props.toaddfavorite(this.props.filterReducer.playItem)
                            }}>
                            {this.props.isFavorite ?
                                <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                                <Heart fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </SafeAreaView >
    }
    onSwipeLeft(gestureState: any) {
        // this.setState({myText: 'You swiped left!'});
    }

    onSwipeRight(gestureState: any) {
        // this.setState({myText: 'You swiped right!'});
    }
    onSwipe(gestureName: any, gestureState: any) {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        //  this.setState({gestureName: gestureName});
        switch (gestureName) {

            case SWIPE_LEFT:
                console.log("left");
                // console.log(this.props.menuReducer.menuData[this.props.menuReducer.activeIndex+1]);
                console.log(this.props.menuReducer.activeIndex);
                this.props.onchangeActiveIndex(this.props.menuReducer.activeIndex + 1)
                this.props.onchangeplayItem(this.props.menuReducer.menuData[this.props.menuReducer.activeIndex + 1])
                this.props.chnageplayUrl(Array.isArray(this.props.menuReducer.menuData[this.props.menuReducer.activeIndex + 1].st)
                    ? this.props.menuReducer.menuData[this.props.menuReducer.activeIndex + 1].st[0].ur : this.props.menuReducer.menuData[this.props.menuReducer.activeIndex + 1].st)
                    if(this.props.filterReducer.isPlayingMusic){
                this._pouseMusic()
                this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                setTimeout(() => {

                    this._startPlayMusic()
                    this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                }, 500);
            }
                //    this.setState({backgroundColor: 'blue'});
                break;
            case SWIPE_RIGHT:
                if (this.props.menuReducer.activeIndex - 1 >= 0) {
                    this.props.onchangeActiveIndex(this.props.menuReducer.activeIndex - 1)
                    this.props.onchangeplayItem(this.props.menuReducer.menuData[this.props.menuReducer.activeIndex - 1])
                    this.props.chnageplayUrl(Array.isArray(this.props.menuReducer.menuData[this.props.menuReducer.activeIndex - 1].st)
                        ? this.props.menuReducer.menuData[this.props.menuReducer.activeIndex - 1].st[0].ur : this.props.menuReducer.menuData[this.props.menuReducer.activeIndex - 1].st)

                  if(this.props.filterReducer.isPlayingMusic)  {this._pouseMusic()
                    this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                    setTimeout(() => {
                        this._startPlayMusic()
                        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                    }, 500);}
                }
                //  this.setState({backgroundColor: 'yellow'});
                break;
        }
    }
    renderBottomSheet() {
        return <SafeAreaView   >
            <StatusBar barStyle={this.props.theme.backgroundColor == "white" ? 'dark-content' : 'light-content'} backgroundColor={this.props.theme.backgroundColor} /><View
                style={{
                    backgroundColor: this.props.theme.backgroundColor,
                    height: deviceHeight, width: deviceWidth + 10
                }}>

                {!this.state.backBttVelosity ? this.renderBottomSheetheader() :
                    <View style={{ flexDirection: 'row' }}>
                        <View   {...this._panResponder.panHandlers} style={[styles.bottomSheet, { zIndex: 0, }]}>
                            <TouchableOpacity
                                style={{
                                    paddingLeft: calcWidth(22),
                                    height: calcHeight(70),
                                    justifyContent: 'center',
                                    width: calcWidth(80), zIndex: 1,
                                    marginLeft: calcWidth(16)
                                    // borderWidth:1
                                }}
                                onPress={() => {
                                    this.props.onchangeswipeablePanelActive(false)
                                }}>
                                <Arrow fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', height: calcHeight(70), width: calcWidth(80) }}
                            onPress={() => {
                                this.props.toaddfavorite(this.props.filterReducer.playItem)
                            }}>
                            {this.props.isFavorite ?
                                <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                                <Heart fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                        </TouchableOpacity>
                    </View>
                }
               
                    <View
                        {...this._panResponder.panHandlers}
                    >
                        <View
                            style={{ marginTop: calcHeight(27), justifyContent: 'center', alignItems: 'center', }}>
                            {this.props.filterReducer.playItem ?
                                <Text style={{
                                    color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                                    fontSize: calcFontSize(24),
                                    fontWeight: '500'
                                }}>{this.props.filterReducer.playItem.pa}</Text> : null}
                        </View>
                        <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: calcHeight(-40) }} />
                        <View

                            style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
                            <SimpleImage size={calcHeight(180)} image={this.props.filterReducer.playItem.im} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.props.filterReducer.playListType ? <Text style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>
                                {this.props.filterReducer.playListType.artist}  {this.props.filterReducer.playListType.song}
                            </Text> : null}
                        </View>
                    </View>
               
                {
                    Array.isArray(this.props.filterReducer.playItem.st) ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
                            {this.props.filterReducer.playItem.st ?
                                this.props.filterReducer.playItem.st.map((item: any) => {
                                    return <TouchableOpacity
                                        onPress={() => {
                                            this.changeRadioStancia(item)
                                        }}
                                        style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                                    >
                                        <Text style={styles.activenumber}>{item.bi}</Text>
                                    </TouchableOpacity>
                                }) : null}
                        </View> : null
                }
 <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction, state)}
style={{flex:1,backgroundColor:'red'}}
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}

                >
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
                        {this.props.filterReducer.playItem.isRecording ?
                            <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' /> :
                            <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} />

                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.isPlaying()
                        }}
                        style={[styles.btnPlay,
                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}>
                        {this.props.filterReducer.isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                            <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!this.props.filterReducer.playItem.pl}
                        style={[styles.btnrecord, { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                        onPress={() => {
                            this._navigatePlayList()
                        }}>
                        <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                    </TouchableOpacity>
                </View>
                </GestureRecognizer>
                

            </View>


        </SafeAreaView >
    }

    render() {
        Dimensions.addEventListener('change', () => {

            this.isPortrait();
        });
        TrackPlayer.addEventListener('remote-play', () => {
            console.log('remote-play');

            TrackPlayer.play();
        });

        TrackPlayer.addEventListener('remote-pause', () => {
          

            TrackPlayer.pause();
        });
        

        return (
            <View
                style={[
                    styles.container,
                    {
                        zIndex: this.props.filterReducer.swipeablePanelActive == false ? 0 : 3,
                    }]}>
                <Animated.View style={[styles.shadowContent,
                {
                    height: this.modalHeightAnim,
                    width: this.modalWidthAnim,
                }
                ]}>

                    {/* <View
                        style={[styles.panResponderView, { height: calcHeight(this.state.headerHeight), }]} >
                        {this.state.headerHeight ? this.renderBottomSheetheader() : null}

                    </View> */}
                    {this.state.orientation == 'portrait' ? this.renderBottomSheet() : this.renderBottomSheetHorizontal()}
                </Animated.View>
            </View>
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
        }, onchangeplayItem: (payload: any) => {
            dispatch(changeplayItem(payload))
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
        // flexDirection:'column'
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
        elevation: 10,
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

        elevation: 8,
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
});