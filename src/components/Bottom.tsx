import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity, SafeAreaView,
    StatusBar,
    Animated,
    PermissionsAndroid,
    Platform,
    PanResponderGestureState,
    ActivityIndicator,
    
ImageBackground
} from 'react-native';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Heart from "../assets/icons/heart.svg"
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
import {
    changeplayItem,
    changePlayingData,
    chnageplayItemArtistandSong,
    changeActiveIndex,
    changeActiveBi,
    getSongData
} from "../store/actions/bottomAction";
import Arrow from "../assets/icons/arrow.svg"
import RecordSvg from "../assets/icons/disrecording.svg"
import DisRecordSvg from "../assets/icons/recording.svg"
import TrackPlayer, { play } from 'react-native-track-player';
import InfoSvg from "../assets/icons/infoMenu.svg"
import { getPlayList } from "../store/actions/playlistAction"
import { addFavorites } from '../store/actions/favoritesActions';
import BackGroundSvg from "../assets/icons/background.svg"
import global_styles from "../assets/styles/global_styles"
import { Dimensions } from 'react-native';
import BackSvg from "../assets/icons/backgraundHorizontal.svg"
import SlidingUpPanel from 'rn-sliding-up-panel';
import Intro from "../screens/Intro"
import player from "../services/player/PlayerServices"
import RNFS from 'react-native-fs';
var RNFileManager = require('react-native-file-manager');

import SwipeUpDown from '../screens/Swiper';

TrackPlayer.registerPlaybackService(() => require('../../service'));

interface Props {
    onCloseStart(): void;
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,
    toaddfavorite(type: any): void;
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
    onchangeActiveBi(payload: any): void;
    onchangeArtist_Song(payload: any): void;
    onchangeActiveIndex(payload: number): void;
    get_songData(payload: any): void;
    menuReducer: any
    list: any,
    favorites: any,
    bottomReducer: any
}
interface IState {
    menuStyle: boolean,
    isRecording: boolean,
    activBi: number,
    activeHeader: boolean,
    orientation: string,
    startValue: any,
    endValue: any,
    headerHeight: boolean,
    backBttVelosity: boolean,
    activSwichItem: any,
    swiperIndex: number,
    swiperactiveIndex: number,
    swipeList: any,
    gestureName: string,
    isLoggingIn: boolean;
    recordSecs: number;
    recordTime: string;
    currentPositionSec: number;
    currentDurationSec: number;
    playTime: string;
    duration: string;
    playingUrl: string | null,
    loading: boolean
}
class Bottom extends React.Component<Props, IState> {
    swiperRef: any
    private audioRecorderPlayer: AudioRecorderPlayer;
    gestureSate: PanResponderGestureState = null
    gestureSateInterval: any = 0
    anim: any = new Animated.Value(0)
    bodyAnim: any = new Animated.Value(1)
    count: number = 0

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
            headerHeight: false,
            backBttVelosity: false,
            swiperIndex: 0,
            activSwichItem: null,
            swiperactiveIndex: 0,
            swipeList: [],
            gestureName: 'none',
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            playingUrl: null,
            loading: false
        }



        this.gestureSateInterval = setInterval(() => {

            if (!!this.gestureSate) {

                if (this.gestureSate.dy > -10 && this.gestureSate.dy < 10 || this.gestureSate.dx > -10 && this.gestureSate.dx < 10) {

                } else {

                    const center: number = (deviceHeight - calcHeight(20)) / 2
                    const delta: number = this.gestureSate.moveY - center;
                    const to: number = delta < 0 ? 0 : delta / center;
                    Animated.timing(this.anim, {
                        toValue: to,
                        duration: 200,
                        useNativeDriver: true
                    }).start();
                }


            }


        }, 10)
    }

    componentWillUnmount() {
        clearInterval(this.gestureSateInterval)

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
        return (   <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        style={global_styles.searchbtn}
                        onPress={() => {
                            this.props.toaddfavorite(this.props.bottomReducer.playItem)
                        }}
                    >
                        {this.checkIsFovorite(this.props.bottomReducer.playItem.id) ?
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
         )

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


    changeRadioStancia(item: any) {
        //this.props.chnageplayUrl(item.ur)
        this.setState({
            playingUrl: item.ur,

        })
        this.props.onchangeActiveBi(item.bi)
        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)

        //this.setState({ activBi: item.bi })
        if (this.props.filterReducer.isPlayingMusic) {
            this.setState({ loading: true })

            this._pouseMusic()
            setTimeout(() => {
                player._startPlayMusic(this.props.bottomReducer.playItem, this.props.bottomReducer.playingMusicArtistSong)
                this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
                this.setState({ loading: false })
            }, 500);
        }

    }
    _navigatePlayList() {
        // if (this.state.activSwichItem) {
        //     if (this.state.activSwichItem.pl) {
        //         this.props.ongetPlayList(this.state.activSwichItem)
        //         this.props.navigation.navigate('PlayList')
        //     }

        // } else
        if (this.props.bottomReducer.playItem.pl) {
            this.props.ongetPlayList(this.props.bottomReducer.playItem)
        //    this.props.navigation.navigate('PlayList')

            // player.close()
        }
    }


    async componentDidMount() {


        Dimensions.addEventListener('change', () => {
            this.isPortrait();
        });
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
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
        this.setState({
            swiperIndex: this.props.bottomReducer.activeIndex
        })
        // if (this.props.bottomReducer.playItem.st) {
        //     this.setState({
        //      //   activBi: this.props.bottomReducer.playItem.st[0].bi,
        //         playingUrl: this.props.bottomReducer.playItem.st[0].ur
        //     })
        // }

    }
    isPlaying() {
        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
        if (this.props.filterReducer.isPlayingMusic) {
            this._pouseMusic()
        } else {
            player._startPlayMusic(this.props.bottomReducer.playItem, this.props.bottomReducer.playingMusicArtistSong)
            this.setState({ loading: false })
        }
        //   this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic)
    }
    private onStartRecord = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }

        // create a path you want to write to
        var path = RNFS.DocumentDirectoryPath + `/audio_record_${Date.now()}.aacp`;

    //    console.log(RNFileManager.MainBundlePath);

        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
       // console.log('audioSet', audioSet);
        const uri = await this.audioRecorderPlayer.startRecorder(path, true, audioSet);

        this.audioRecorderPlayer.addRecordBackListener((e: any) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
        });
        //console.log(`uri: ${uri}`,);
    }

    private onStartPlay = async () => {
        console.log('onStartPlay');
        var path = RNFS.DocumentDirectoryPath + `/audio_record_${Date.now()}.mp4saacp`;

        // const path = Platform.select({
        //     ios: 'hello.m4a',
        //     android: 'sdcard/hello.mp4',
        // });
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        this.audioRecorderPlayer.setVolume(1.0);
       // console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e: any) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.audioRecorderPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
        });
    };
    private onStopRecord = async () => {
        console.log("stoppppppppp");

        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
        });
        const dest = `${result}`;
        // RNFS.copyFileAssets(result, dest)
        // .then(() => {
        //     console.log("opeeeeeeeeeeeeeeeeeeeen");

        //     FileViewer.open(dest)
        // })
        // .then(() => {
        //    // success
        // })
        // .catch(error => {
        //    /* */
        //    console.log(error);

        // });
        // Alert.alert(
        //     "Finish recording",
        //     result,
        //     [
        //       {
        //         text: "Cancel",
        //         onPress: () => console.log("Cancel Pressed"),
        //         style: "cancel"
        //       },
        //       { text: "OK", onPress: () => console.log("OK Pressed") }
        //     ],
        //     { cancelable: false }
        //   );
      //  console.log(result);
    };

    renderBottomSheetHorizontal() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return <ImageBackground
        resizeMode='stretch'
        source={require('../assets/images/img2.png')}
        style={{ 
            backgroundColor: this.props.theme.backgroundColor,
            alignItems:'center',
        height:'85%', 
 }}
       >
               
                <View ref="rootView" style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                   marginTop:calcHeight(-10),
                   height:'100%',
                }}>
                      
                           
                                
                                {this.props.bottomReducer.activeIndex > 0 ?
                                    <TouchableOpacity
                                        disabled={this.props.bottomReducer.activeIndex == 0}
                                        onPress={() => {
                                            this.count -= 1
                                            this.swipeLeft()
                                        }}
                                        style={[styles.arrow, { marginLeft: calcWidth(20), marginTop: calcHeight(75) }]}
                                    >
                                        <Text style={{ fontSize: calcFontSize(40), justifyContent: 'center' }}>
                                            {"<"}
                                        </Text>
                                    </TouchableOpacity>:<View  style={[styles.arrow, { marginLeft: calcWidth(20), marginTop: deviceWidth / 4 }]}/>}

                                    <SimpleImage size={calcHeight(180)} image={this.props.bottomReducer.playItem.im} />
                        <View style={{  flexDirection: 'row' , marginLeft:calcHeight(30), marginTop:10}}>
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
                                    }>
                                        {this.props.bottomReducer.playItem.st ?
                                            this.props.bottomReducer.playItem.st.map((item: any, index: number) => {
                                                return <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        this.changeRadioStancia(item)
                                                    }}
                                                    style={item.bi == this.props.bottomReducer.activeBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                                                >
                                                    <Text style={styles.activenumber}>{item.bi}</Text>
                                                </TouchableOpacity>
                                            })
                                            : null}
                                    </View>
                                    <View style={{
                                        alignItems: 'center', 
                                        flexDirection: 'row', justifyContent: 'center',
                                        marginTop:calcHeight(20),marginLeft:10
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (this.state.isRecording) {
                                                    this.onStopRecord()
                                                } else {
                                                    this.onStartRecord()
                                                }
                                                this.setState({ isRecording: !this.state.isRecording })
                                            }}
                                            style={[styles.btnrecord,
                                            { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                        >
                                            {this.state.isRecording ?
                                                <RecordSvg width={calcHeight(20)} height={calcHeight(20)} fill='#FF5050' /> :
                                                <DisRecordSvg width={calcHeight(20)} height={calcHeight(20)} />
                                            }
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (this.state.swiperIndex == this.props.bottomReducer.activeIndex) {
                                                    this.isPlaying()
                                                } else {

                                                    this.setState({ loading: true })
                                                    this._pouseMusic()
                                                    setTimeout(() => {
                                                        player._startPlayMusic(this.props.bottomReducer.playItem, this.props.bottomReducer.playingMusicArtistSong)
                                                        this.setState({ swiperIndex: this.props.bottomReducer.activeIndex, loading: false })

                                                    }, 500);
                                                    this.props.onchangePlayingMusic(true)

                                                }

                                            }}
                                            style={[styles.btnPlay,
                                            { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}>
                                            {this.isPlayingMusic() ? <Stop width={calcHeight(24)} height={calcHeight(27)} fill='white' /> :
                                                <PlaySvG width={calcHeight(26.66)} height={calcHeight(37)} fill='white' />}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            disabled={!this.props.bottomReducer.playItem.pl}
                                            style={[styles.btnrecord,
                                            { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                            onPress={() => {
                                                this._navigatePlayList()
                                            }}>
                                            <InfoSvg width={calcHeight(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.arrow,]}
                                            disabled={this.props.bottomReducer.activeIndex == this.props.menuReducer.menuData.length - 1}
                                            onPress={() => {
                                                console.log("right");
                                                this.count += 1
                                                this.swipeRight()
                                            }}
                                        >
                                            <Text style={{ fontSize: calcFontSize(40), justifyContent: 'center' }}>
                                                {">"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                          

                        </View>
                   
            
                </View>
                {/* </View> */}
            </ImageBackground>
       
    }

    checkIsFovorite(num: number) {

        return this.props.favorites.includes(num)
    }
    lastClickData = Date.now()
    swipeLeft() {
        this.lastClickData = Date.now()
        setTimeout(() => {
            if (Date.now() - this.lastClickData > 450) {

                this.props.get_songData(this.props.menuReducer.filterData[this.count])
            }

        }, 500)
        this.props.onchangeplayItem(this.props.menuReducer.filterData[this.props.bottomReducer.activeIndex - 1])
        ///this.props.onchangeActiveBi(this.props.menuReducer.menuData[this.props.bottomReducer.activeIndex - 1].st[0].bi)
        this.props.onchangeActiveIndex(this.props.bottomReducer.activeIndex - 1)

        this.props.onchangePlayingMusic(this.state.swiperIndex == this.props.bottomReducer.activeIndex - 1)
        if (this.props.settingsReducer.autoPlay) {
            this.setState({
                swiperIndex: this.props.bottomReducer.activeIndex - 1,
                loading: true
            })

        }
    }


    swipeRight() {

        this.lastClickData = Date.now()
        setTimeout(() => {
            if (Date.now() - this.lastClickData > 450) {


                this.props.get_songData(this.props.menuReducer.filterData[this.count])
            }

        }, 500)


        this.props.onchangeplayItem(this.props.menuReducer.filterData[this.props.bottomReducer.activeIndex + 1])
        //this.props.onchangeActiveIndex(this.props.menuReducer.menuData[this.props.bottomReducer.activeIndex + 1].st[0].bi)
        this.props.onchangeActiveIndex(this.props.bottomReducer.activeIndex + 1)
        this.props.onchangePlayingMusic(this.state.swiperIndex == this.props.bottomReducer.activeIndex + 1)
        if (this.props.settingsReducer.autoPlay) {
            this.setState({
                swiperIndex: this.props.bottomReducer.activeIndex + 1,
            })
        }



    }
    isPlayingMusic() {
        if (this.props.filterReducer.isPlayingMusic && this.state.swiperIndex == this.props.bottomReducer.activeIndex) {
            return true
        } else if (this.props.filterReducer.isPlayingMusic && this.props.settingsReducer.autoPlay) {
            return true
        } else {
            return false
        }
    }
    renderBottomSheet() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return <View style={{height: deviceHeight,paddingBottom:calcHeight(250),backgroundColor:this.props.theme.backgroundColor
    }}>
                <View style={{
                    
                    paddingBottom:calcHeight(100),
                }}>
                 

                    <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: calcHeight(-150) }} />
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {this.props.bottomReducer.activeIndex > 0?
                            <TouchableOpacity
                                disabled={this.props.bottomReducer.activeIndex == 0}
                                onPress={() => {
                                    console.log("left");
                                    this.count -= 1
                                    this.swipeLeft()
                                }}
                                style={styles.arrow}
                            >
                                <Text style={{ fontSize: calcFontSize(40) }}>
                                    {"<"}
                                </Text>
                            </TouchableOpacity>:<View style={styles.arrow}/>}
                        <View
                            style={{ height: calcHeight(280), justifyContent: 'center', alignItems: 'center', }}>

                            {/*<SimpleImage size={calcHeight(180)} image={this.props.bottomReducer.playItem.im} />*/}
                        </View>
                        {this.props.bottomReducer.activeIndex < this.props.menuReducer.menuData.length - 1 ?
                            <TouchableOpacity style={styles.arrow}
                                disabled={this.props.bottomReducer.activeIndex == this.props.menuReducer.menuData.length - 1}
                                onPress={() => {
                                    console.log("right");
                                    this.count += 1
                                    this.swipeRight()
                                }}
                            >
                                <Text style={{ fontSize: calcFontSize(40), justifyContent: 'center' ,}}>
                                    {">"}
                                </Text>
                            </TouchableOpacity>:<View style={styles.arrow}/>}
                    </View>

                    {/*<View style={{*/}
                    {/*    justifyContent: 'center',*/}
                    {/*    alignItems: 'center',*/}
                    {/*    marginHorizontal: calcWidth(20),*/}
                    {/*}}>*/}
                    {/*    {this.props.bottomReducer.playingMusicArtistSong ?*/}
                    {/*        <Text style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>*/}
                    {/*            {this.props.bottomReducer.playingMusicArtistSong.artist}  {this.props.bottomReducer.playingMusicArtistSong.song}*/}
                    {/*        </Text> : null}*/}
                    {/*</View>*/}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
                    }>
                        {this.props.bottomReducer.playItem ?
                            this.props.bottomReducer.playItem.st.map((item: any, index: number) => {
                                return <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        this.changeRadioStancia(item)
                                    }}
                                    style={item.bi == this.props.bottomReducer.activeBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                                >
                                    <Text style={styles.activenumber}>{item.bi}</Text>
                                </TouchableOpacity>
                            })
                            : null}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center',
                }}>
                    <View style={{ marginTop: calcHeight(11) }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.isRecording) {
                                    this.onStopRecord()
                                } else {
                                    this.onStartRecord()
                                }
                                this.setState({ isRecording: !this.state.isRecording })
                            }}
                            style={[styles.btnrecord,
                            { zIndex: 0, backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                        >
                            {this.state.isRecording ?
                                <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' /> :
                                <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} />
                            }
                        </TouchableOpacity>
                        <Text style={[styles.recordingTime, { color: this.props.theme.backgroundColor == "white" ? '#0F1E45' : 'white', }]}>
                            {this.state.recordSecs > 0 ? this.state.recordTime : ''}
                        </Text>
                    </View>
                    {
                        this.state.loading ?
                            <View

                                style={[styles.btnPlay,
                                { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', marginTop: calcHeight(5) }]}>
                                <ActivityIndicator size="large" color="white" />
                            </View>

                            :
                            <TouchableOpacity
                                onPress={() => {
                                    //  this.props.onchangeplayItem(this.props.bottomReducer.playItem)
                                    // this.isPlaying()
                                    if (this.state.swiperIndex == this.props.bottomReducer.activeIndex) {
                                        this.isPlaying()
                                    } else {

                                        this.setState({ loading: true })
                                        this._pouseMusic()
                                        setTimeout(() => {
                                            player._startPlayMusic(this.props.bottomReducer.playItem, this.props.bottomReducer.playingMusicArtistSong)
                                            this.setState({ swiperIndex: this.props.bottomReducer.activeIndex, loading: false })

                                        }, 500);
                                        this.props.onchangePlayingMusic(true)

                                    }

                                }}
                                style={[styles.btnPlay,
                                { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', marginTop: calcHeight(5) }]}>
                                {this.isPlayingMusic() ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                                    <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                            </TouchableOpacity>
                    }

                    <TouchableOpacity
                        disabled={!this.props.bottomReducer.playItem.pl}
                        style={[styles.btnrecord, { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', marginTop: calcHeight(10) }]}
                        onPress={() => {
                            this._navigatePlayList()
                        }}>
                        <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                    </TouchableOpacity>
                </View>

            </View>
       
    }

    renderBody() {
        Animated.timing(this.anim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true
        }).start();
    }
closed() {
        Animated.timing(this.anim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true
        }).start();
        // player.close()
    } 
    render() {
        Dimensions.addEventListener('change', () => {
            console.log("chnageee");

            this.isPortrait();
        })

console.log("--------------------------------------",this.isPlayingMusic());

        return (

            <SwipeUpDown
                hasRef={(ref: any) => (player.init(ref))}
                anim={this.anim}
                animation={'linear'}
                orientation={this.state.orientation}
                itemMini={this.renderBottomSheetheader()} // Pass props component when collapsed
              itemFull={this.state.orientation == 'landscape' ? this.renderBottomSheetHorizontal() : this.renderBottomSheet()} // Pass props component when show full
                onShowMini={() => {
                    console.log("miniiiiiiiiiiiiiiiiii");
                    
                    Animated.timing(this.anim, {
                        toValue: 1,
                        duration: 50,
                        useNativeDriver: true
                    }).start();
                }}
                onShowFull={()=>{    Animated.timing(this.anim, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true
                }).start();}}
                closed={()=>{this.closed()}}
                checkIsFovorite={()=> this.checkIsFovorite(this.props.bottomReducer.playItem.id)}   
                bottomReducer={this.props.bottomReducer}
                backgroundColor= {this.props.theme.backgroundColor}
                toaddfavorite={()=>this.props.toaddfavorite(this.props.bottomReducer.playItem)} 
                onMoveUp={() => console.log('up')}
                swipeHeight={calcHeight(86)}
                disablePressToShow={false} // Press item mini to show full
                style={{ backgroundColor: 'rgba(255,255,255,0)', flex: 1, }} // style for swipe
            />

            // <SlidingUpPanel

            //     // onBottomReached={() => {
            //     //             this.props.onchangeswipeablePanelActive(false)
            //     //         }}
            //     backdropStyle={{ backgroundColor: 'green' }}
            //     draggableRange={{ top: deviceHeight - 20, bottom: calcHeight(86) }}
            //     ref={c => this._panel = c} >
            //     <TouchableOpacity
            //         style={{ height: 100 }}
            //         onPress={() => {
            //             this._panel.show(1)
            //         }}
            //     >
            //         <Text>
            //             ok</Text>
            //     </TouchableOpacity>

            //     </SlidingUpPanel>
            // <SlidingUpPanel
            //     backdropOpacity={1}
            //     friction={0.918}
            //     // allowDragging={this.state.headerHeight}
            //     onDragStart={(p, t) => {
            //         this.gestureSate = t;

            //     }}
            //     onDragEnd={(s, k) => {
            //         this.gestureSate = null
            //         Animated.timing(this.anim, {
            //             toValue: 1,
            //             duration: 50,
            //             useNativeDriver: true
            //         }).start();

            //     }}
            //     onMomentumDragEnd={(position: number) => {
            //         this.gestureSate = null

            //     }}

            //     backdropStyle={{ backgroundColor: 'grey' }}
            //     draggableRange={{ top: deviceHeight - calcHeight(20) + calcHeight(86), bottom: calcHeight(86) }}
            //     ref={c => {
            //         player.init(c)
            //     }}
            // >
            //     <View>

            //         {this.state.orientation == 'landscape' ? this.renderBottomSheetHorizontal() : this.renderBottomSheet()}

            //     </View>
            // </SlidingUpPanel>
            /* <View
               style={{
                  backgroundColor: 'red',
                  height:deviceHeight
              }}>
                  <TouchableOpacity
                      onPress={() => {player.close()
                          
                       }}
                      style={{
                          backgroundColor: 'yellow',
                         
                      }}>
                      <Text>close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => { player.open() }}
                      style={{
                          backgroundColor: 'blue',
                         
                      }}>
                      <Text>open</Text>
                  </TouchableOpacity>
                  
              </View>  */
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
const mapStateToProps = ({ filterReducer, favorites, theme, settingsReducer, menuReducer, bottomReducer }: any) => {
    return { filterReducer, favorites, theme, settingsReducer, menuReducer, bottomReducer }
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
        onchangeActiveBi: (payload: any) => {
            dispatch(changeActiveBi(payload))
        },
        onchangeArtist_Song: (payload: any) => {
            dispatch(chnageplayItemArtistandSong(payload))
        },
        get_songData: (payload: any) => {
            dispatch(getSongData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Bottom);

const styles = StyleSheet.create({
    arrow: { height: calcHeight(100), width: calcWidth(100), justifyContent: 'center', alignItems: 'center', },
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
        marginTop: calcHeight(-28)
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

    },
    recordingTime: {
        marginTop: calcHeight(10)
    }
});