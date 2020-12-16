import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
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
import {changeIsConnected} from "../store/actions/bottomAction";
import {
    changeplayItem,
    changePlayingData,
    chnageplayItemArtistandSong,
    changeActiveIndex,
    changeMiniScreenData,
    getSongData,
    changeSelectedRadioStationPlaying,
    changeSwiperShowStation,
    changeSelectedRadioStation,
    changeSwiperActiveBi,
    changeSelectedSatationbyBi
} from "../store/actions/bottomAction";
import {changeInitialRouteName, changeLookingList} from "../store/actions/menuActions"
import RecordSvg from "../assets/icons/disrecording.svg"
import DisRecordSvg from "../assets/icons/recording.svg"
import TrackPlayer, { play } from 'react-native-track-player';
import InfoSvg from "../assets/icons/infoMenu.svg"
import { getPlayList } from "../store/actions/playlistAction"
import { addFavorites } from '../store/actions/favoritesActions';
import BackGroundSvg from "../assets/icons/background.svg"
import global_styles from "../assets/styles/global_styles"
import player from "../services/player/PlayerServices"
import RNFS from 'react-native-fs';
import navigationService from "../navigation/NavigationService"
var RNFileManager = require('react-native-file-manager');
import SwipeUpDown from '../screens/Swiper';
import {getData, storeData} from "../utils/local_storage";
import Modal from "react-native-modal";
import NetInfo from "@react-native-community/netinfo";
TrackPlayer.registerPlaybackService(() => require('../../service'));
interface Props {
    onCloseStart(): void;
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,
    toaddfavorite(type: any): void;
    onchangeLookingList(type: any): void;
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
    bottomReducer: any,
    onchangeSelectedRadioStationPlaying(payload: any): void;
    onchangeSwiperShowStation(payload: any): void;
    onchangeSelectedRadioStation(payload: any): void;
    isSwiper: boolean,
    onchangeMiniScreenData(payload:any):void;
onchangeInitialRouteName(payload:any):void;
    onchangeSelectedSatationbyBi(payload:any):void;
onchangeIsConnected(payload:any):void;
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
    loading: boolean,
    loadingStation:boolean,
    visibleModal:boolean
}
class BottomSwiper extends React.Component<Props, IState> {
    swiperRef: any
    private audioRecorderPlayer: AudioRecorderPlayer;
    gestureSate: PanResponderGestureState = null
    gestureSateInterval: any = 0
    anim: any = new Animated.Value(0)
    bodyAnim: any = new Animated.Value(1)
    count: number = 0
    timerHandle: any = 0
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
            loading: false,
            loadingStation:false,
            visibleModal:false
        }
    }
    async componentDidMount() {

        TrackPlayer.addEventListener('remote-stop', async () => {
            console.log('stop')
            this.props.onchangeSelectedRadioStationPlaying(false)

            await TrackPlayer.stop()
        });
        TrackPlayer.addEventListener('remote-play', async () => {
            console.log('play')
            this.props.onchangeSelectedRadioStationPlaying(true)

            await TrackPlayer.play()
        });

        TrackPlayer.addEventListener('remote-pause', async () => {
            console.log('pause')
            this.props.onchangeSelectedRadioStationPlaying(false)

            await TrackPlayer.pause()
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
        await TrackPlayer.play();

        this.props.onchangeMiniScreenData(this.props.bottomReducer.selectedRadioStation)
    }
    checkIsFovorite(num: number) {
        return this.props.favorites.includes(num)
    }
    _addLookingList(data: any) {
        getData("isLooking").then((lookList) => {
            let count = true
            if (lookList.length > 0) {
             //   console.log(lookList);
                for (let index = 0; index < lookList.length; index++) {
                    const element = lookList[index];
                    if (element.id == data.id) {
//  console.log(lookList.splice(index, 1));

                    }
                }
                lookList.push(data)

            } else {
                lookList.push(data)
            }
            storeData("isLooking", lookList).then(() => {
                this.props.onchangeLookingList(lookList)
            })
        })
    }
    isPlaying() {
        //console.log('his.props.bottomReducer.selectedRadioStation', this.props.bottomReducer.selectedRadioStation);

        if (this.props.bottomReducer.selectedRadioStation.isPlayingMusic) {
            player._pouseMusic()
            this.props.onchangeSelectedRadioStationPlaying(false)
        } else {
            this._addLookingList(this.props.bottomReducer.selectedRadioStation.data)
            player._startPlayMusic(this.props.bottomReducer.selectedRadioStation.data, this.props.bottomReducer.selectedRadioStation.activeBi)
            this.props.onchangeSelectedRadioStationPlaying(true)
        }

    }
    lastClickData = Date.now()
    swipeLeft() {

        this.props.onchangeActiveIndex(this.props.bottomReducer.activeIndex-1)
        this.setState({loadingStation:true})
        if (this.count > 0) {
            let radiostation = {
                data: this.props.menuReducer.filterData[this.props.bottomReducer.activeIndex - 1],
                isPlayingMusic: false,
                activeBi: 0,
                id: this.props.menuReducer.filterData[this.props.bottomReducer.activeIndex - 1].id,
            }
            if (this.timerHandle) {
                clearTimeout(this.timerHandle);
            }
            this.props.onchangeSwiperShowStation(radiostation)
            this.timerHandle = setTimeout(() => {
                this.props.onchangeSwiperShowStation(radiostation)
                if(!this.props.bottomReducer.selectedRadioStation.isPlayingMusic) {
                    this.props.onchangeMiniScreenData(radiostation)
                }
                this.props.get_songData(radiostation)
                this.setState({loadingStation:false})
            }, 500)

            if (this.props.settingsReducer.autoPlay) {
                this.setState({
                    swiperIndex: this.count - 1,
                })
            }
        }
    }

    swipeRight() {
        //console.log("::::",!this.props.bottomReducer.selectedRadioStation.isPlayingMusic);
        this.setState({loadingStation:true})
        this.props.onchangeActiveIndex(this.props.bottomReducer.activeIndex+1)

        let radiostation = {
            data: this.props.menuReducer.filterData[this.props.bottomReducer.activeIndex + 1],
            isPlayingMusic: false,
            activeBi: 0,
            id: this.props.menuReducer.filterData[this.props.bottomReducer.activeIndex + 1].id,
        }
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
        }
        this.props.onchangeSwiperShowStation(radiostation)
        this.timerHandle = setTimeout(() => {
            this.props.onchangeSwiperShowStation(radiostation)
            // if(!this.props.bottomReducer.selectedRadioStation.isPlayingMusic) {
            //     this.props.onchangeMiniScreenData(radiostation)
            // }
            this.props.get_songData(radiostation)
            this.setState({loadingStation:false})
        }, 500)

        if (this.props.settingsReducer.autoPlay) {
            this.setState({
                swiperIndex: this.count + 1,
            })
        }
    }
    chooseList(){
        if(this.props.bottomReducer.selectedRadioStation && this.props.bottomReducer.selectedRadioStation.isPlayingMusic){
            return this.props.bottomReducer.selectedRadioStation.id
        }else if(this.props.bottomReducer.selectedRadioStation==null && this.props.bottomReducer.swiperShowRadiostation) {
            return this.props.bottomReducer.swiperShowRadiostation.id
        }
    }
    renderBottomSheetheader() {
        return <View style={{ flexDirection: 'row', alignItems: 'center', }}>

            <TouchableOpacity
                style={global_styles.searchbtn}
                onPress={() => {
                    this.props.bottomReducer.miniScreenData.data&& this.props.toaddfavorite(this.props.bottomReducer.miniScreenData.data)
                }}
            >
                { this.props.bottomReducer.miniScreenData && this.checkIsFovorite(this.props.bottomReducer.miniScreenData.id) ?
                    <RedHeart fill='#FF5050' height={(19)} width={(21)} /> :
                    <Heart fill='#B3BACE' height={(18.54)} width={(20.83)} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.player,
                { backgroundColor: this.props.theme.backgroundColor == "white" ? 'white' : '#0D1834' }]}
                onPress={() => {
                    if(this.props.bottomReducer.isConnected){
                        if (this.props.bottomReducer.selectedRadioStation?.id == this.props.bottomReducer.miniScreenData.id) {
                            this.isPlaying()
                        } else {
                            player._pouseMusic()
                            this.setState({ loading: true })
                            let d = this.props.bottomReducer.miniScreenData
                            d.isPlayingMusic = true
                            this.props.onchangeSelectedRadioStation(d)
                            this._addLookingList(this.props.bottomReducer.miniScreenData.data)
                            setTimeout(() => {

                                this.props.bottomReducer.miniScreenData &&  player._startPlayMusic(this.props.bottomReducer.miniScreenData.data, this.props.bottomReducer.miniScreenData.data.st[0])
                                this.setState({ swiperIndex: this.count, loading: false })

                            }, 500);
                        }
                    }else{
                        this.setState({visibleModal:true})
                    }
                }
                    }

            >
                {this.props.bottomReducer.miniScreenData && this.props.bottomReducer.miniScreenData.isPlayingMusic ? <Stop width={(16)} height={(22)} fill={this.props.theme.backgroundColor == "white" ? '#101C3B' : 'white'} /> :
                    <PlaySvG width={calcWidth(16)} height={(22)} fill={this.props.theme.backgroundColor == "white" ? '#101C3B' : 'white'} />}
            </TouchableOpacity>
        </View>
    }
    _navigatePlayList() {
        if (this.props.bottomReducer.swiperShowRadiostation.data.pl) {
            this.props.ongetPlayList(this.props.bottomReducer.swiperShowRadiostation.data)
            navigationService.navigate('PlayList')
            player.close()
        }
    }

    changeRadioStancia(item: any) {

        this.setState({ loading: true })

        if(this.props.bottomReducer.swiperShowRadiostation.id==this.props.bottomReducer.selectedRadioStation.id){
            this.props.onchangeActiveBi(item)
                player._pouseMusic()
                setTimeout(() => {
                    player._startPlayMusic(this.props.bottomReducer.swiperShowRadiostation.data, this.props.bottomReducer.swiperShowRadiostation.activeBi)
                    this.props.onchangeSelectedRadioStationPlaying(true)
                    this.setState({ loading: false })
                }, 500);
        }else{
            let data=this.props.bottomReducer.swiperShowRadiostation
            data.isPlayingMusic=true
            data.activeBi=item

            player._pouseMusic()
            this.props.onchangeSelectedSatationbyBi(data)
           // this.props.onchangeSelectedRadioStation(data)

            setTimeout(() => {
                this._addLookingList(this.props.bottomReducer.swiperShowRadiostation.data)
                player._startPlayMusic(this.props.bottomReducer.swiperShowRadiostation.data, this.props.bottomReducer.swiperShowRadiostation.activeBi)
                this.props.onchangeSelectedRadioStationPlaying(true)
                this.setState({ loading: false })
            }, 500);
        }

    }
    closed() {
        Animated.timing(this.anim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true
        }).start();
        // player.close()
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

       // console.log(RNFileManager.MainBundlePath);

        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
   console.log('audioSet', audioSet);
        const uri = await this.audioRecorderPlayer.startRecorder(path, true, audioSet);

        this.audioRecorderPlayer.addRecordBackListener((e: any) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
        });

    }

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
        // console.log(result);
    };
    showActiveBi() {
        if (this.props.bottomReducer.swiperShowRadiostation.id == this.props.bottomReducer.selectedRadioStation.id) {
            return this.props.bottomReducer.selectedRadioStation.activeBi.bi
        } else {
            return this.props.bottomReducer.swiperShowRadiostation.data.st[0].bi
        }
    }
    renderBottomSheet() {
        return <View style={{
            height: deviceHeight-50,

           backgroundColor: this.props.theme.backgroundColor
        }}>
            <View style={{

                paddingBottom: 80,
            }}>


                <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: -160, }} />
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}
                >
                    {this.props.bottomReducer.activeArrow && this.props.bottomReducer.activeIndex> 0 ?
                        <TouchableOpacity
                            disabled={this.count == 0}
                            onPress={() => {
                                console.log("left");

                                this.swipeLeft()
                            }}
                            style={styles.arrow}
                        >
                            <Text style={{ fontSize: 40, justifyContent: 'center', color: this.props.theme.backgroundColor == 'white' ? 'grey' : 'white' }}>
                                {"<"}
                            </Text>
                        </TouchableOpacity> : <View style={styles.arrow} />}

                    <View
                        style={{ justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.loadingStation?<View  style={styles.swiperImage}>
                            <ActivityIndicator size={100} color="#EBEEF7"  />
                        </View>:
                        <SimpleImage size={180} image={this.props.bottomReducer.swiperShowRadiostation.data.im} />}
                    </View>
                    {this.props.bottomReducer.activeArrow && this.props.bottomReducer.activeIndex < this.props.menuReducer.menuData.length - 1 ?
                        <TouchableOpacity style={styles.arrow}
                            disabled={this.count == this.props.menuReducer.menuData.length - 1}
                            onPress={() => {
                                console.log("right");
                                this.count += 1
                                this.swipeRight()
                            }}
                        >
                            <Text style={{ fontSize: 40, justifyContent: 'center', color: this.props.theme.backgroundColor == 'white' ? 'grey' : 'white' }}>
                                {">"}
                            </Text>
                        </TouchableOpacity> : <View style={styles.arrow} />}
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 20,
                }}>

                        <Text numberOfLines={1} style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: 17, width: 250, textAlign: 'center' }}>
                            {this.props.bottomReducer?.swiperShowRadiostation?.playingSong?.artist}  {this.props.bottomReducer?.swiperShowRadiostation?.playingSong?.song}
                        </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 23 }
                }>

                    {this.props.bottomReducer.swiperShowRadiostation.data.st.map((item: any, index: number) => {
                        return <TouchableOpacity
                            key={index}
                            onPress={() => {

                                this.changeRadioStancia(item)
                            }}
                            style={item.bi == this.showActiveBi() ? [styles.numbers, { marginRight: 15 }] : styles.activeNumbers}
                        >
                            <Text style={styles.activenumber}>{item.bi}</Text>
                        </TouchableOpacity>
                    })}

                </View>
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'center'
            }}>
                <View style={{ marginTop: 11 }}>
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
                            <RecordSvg width={20} height={20} fill='#FF5050' /> :
                            <DisRecordSvg width={20} height={20} />
                        }
                    </TouchableOpacity>
                    <Text style={[styles.recordingTime, { color: this.props.theme.backgroundColor == "white" ? '#0F1E45' : 'white' }]}>
                        {this.state.recordSecs > 0 ? this.state.recordTime : ''}
                    </Text>
                </View>
                {this.state.loading ?
                    <View
                        style={[styles.btnPlay,
                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', marginTop: calcHeight(5) }]}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            if(this.props.bottomReducer.isConnected){
                            if (this.props.bottomReducer.selectedRadioStation.id == this.props.bottomReducer.swiperShowRadiostation?.id) {
                                this.isPlaying()
                            } else {
                                player._pouseMusic()
                                this.setState({ loading: true })
                                let d = this.props.bottomReducer.swiperShowRadiostation
                                d.isPlayingMusic = true
                                console.log("ddd",d)
                                this.props.onchangeSelectedRadioStation(d)
                                this.props.onchangeMiniScreenData(d)
                                setTimeout(() => {
                                    this._addLookingList(this.props.bottomReducer.swiperShowRadiostation.data)
                                    player._startPlayMusic(this.props.bottomReducer.swiperShowRadiostation?.data, this.props.bottomReducer.swiperShowRadiostation?.data.st[0])
                                    this.setState({ swiperIndex: this.count, loading: false })

                                }, 500);
                            }}else{
                                console.log(";;;;;;;;;;;;;;;;;;;;")
                                this.props.onchangeIsConnected(false)
                            }}}
                        style={[styles.btnPlay,
                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', marginTop: calcHeight(5) }]}>
                        {this.props.bottomReducer.selectedRadioStation?.id == this.props.bottomReducer.swiperShowRadiostation?.id && this.props.bottomReducer.selectedRadioStation?.isPlayingMusic ?
                            <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                            <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                    </TouchableOpacity>
                }

                <TouchableOpacity
                     disabled={!this.props.bottomReducer.swiperShowRadiostation.data.pl}
                    style={[styles.btnrecord, { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', marginTop: calcHeight(10) }]}
                    onPress={() => {
                        this._navigatePlayList()
                    }}>
                    <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                </TouchableOpacity>
            </View>

        </View>
    }

    renderBottomSheetHorizontal() {
        return <View ref="rootView" style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                //backgroundColor: this.props.theme.backgroundColor,
                height: this.props.theme.height + 10,
            position:'absolute',
            top:80
            }}>

            {this.props.bottomReducer.activeArrow && this.props.bottomReducer.activeIndex> 0?
        <TouchableOpacity
                    disabled={this.count == 0}
                    onPress={() => {
                        console.log("left");
                        this.count -= 1
                        this.swipeLeft()
                    }}
                    style={[styles.arrow, { marginLeft: 20, marginTop: 30 }]}
                >
                    <Text style={{ fontSize: 40, justifyContent: 'center' }}>
                        {"<"}
                    </Text>
                </TouchableOpacity> : <View style={[styles.arrow, { marginLeft: 20, marginTop: deviceWidth / 4 }]} />}
                {this.state.loadingStation?<View  style={styles.swiperImage}>
                        <ActivityIndicator size={100} color="#EBEEF7"  />
                    </View>:
                <SimpleImage size={180} image={this.props.bottomReducer.swiperShowRadiostation.data.im} />}
                <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 10 }}>
                    <View >
                        <View style={{ justifyContent: 'center', alignItems: 'center'  }}>

                            <View style={{ flexDirection: 'row', marginTop: 23, width: 200, justifyContent: 'center' }
                            }>

                                {this.props.bottomReducer.swiperShowRadiostation.data.st.map((item: any, index: number) => {
                                    return <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            this.changeRadioStancia(item)
                                        }}
                                        style={item.bi == this.showActiveBi() ? [styles.numbers, { marginRight: 15 }] : styles.activeNumbers}
                                    >
                                        <Text style={styles.activenumber}>{item.bi}</Text>
                                    </TouchableOpacity>
                                })}

                            </View>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row', justifyContent: 'center',
                                marginTop: 20, marginLeft: 10,

                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.isRecording) {
                                            this.onStopRecord()
                                            this.setState({ isRecording: false })
                                        } else {
                                            this.onStartRecord()
                                            this.setState({ isRecording: true})
                                        }

                                    }}
                                    style={[styles.btnrecord,
                                    { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                >
                                    {this.state.isRecording ?
                                        <RecordSvg width={20} height={20} fill='#FF5050' /> :
                                        <DisRecordSvg width={20} height={20} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        if(this.props.bottomReducer.isConnected){
                                        if (this.props.bottomReducer.selectedRadioStation.id == this.props.bottomReducer.swiperShowRadiostation?.id) {
                                            this.isPlaying()
                                        } else {
                                            player._pouseMusic()
                                            this.setState({ loading: true })
                                            let d = this.props.bottomReducer.swiperShowRadiostation
                                            d.isPlayingMusic = true
                                            this.props.onchangeSelectedRadioStation(d)
                                            this.props.onchangeMiniScreenData(d)
                                            setTimeout(() => {
                                                this._addLookingList(this.props.bottomReducer.swiperShowRadiostation.data)

                                                player._startPlayMusic(this.props.bottomReducer.swiperShowRadiostation?.data, this.props.bottomReducer.swiperShowRadiostation?.data.st[0])
                                                this.setState({ swiperIndex: this.count, loading: false })

                                            }, 500);
                                        }}else{
                                            this.setState({visibleModal:true})

                                        }
                                    }
                                    }
                                    style={[styles.btnPlay,
                                    { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}>
                                    {this.props.bottomReducer.selectedRadioStation?.id == this.props.bottomReducer.swiperShowRadiostation?.id && this.props.bottomReducer.selectedRadioStation?.isPlayingMusic ?
                                        <Stop width={26.66} height={37} fill='white' /> :
                                        <PlaySvG width={26.66} height={37} fill='white' />}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={!this.props.bottomReducer.swiperShowRadiostation.data.pl}
                                    style={[styles.btnrecord,
                                    { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                                    onPress={() => {
                                        this._navigatePlayList()
                                    }}>
                                    <InfoSvg width={29.91} height={24.22} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                    {this.props.bottomReducer.activeArrow && this.count < this.props.menuReducer.menuData.length - 1 && <TouchableOpacity
                        style={[styles.arrow,{marginTop:20}]}
                      disabled={this.props.bottomReducer.activeIndex == this.props.menuReducer.menuData.length - 1}
                      onPress={() => {
                      console.log("right");
                       this.count += 1
                       this.swipeRight()
                       }}
                    >
                        <Text style={{ fontSize: 40, justifyContent: 'center' }}>
                            {">"}
                        </Text>
                    </TouchableOpacity>}
                </View>
            </View>
    }
    render() {
        if(this.props.bottomReducer.swiperShowRadiostation ){
            return (
                <SwipeUpDown
                hasRef={(ref: any) => {

                    if (!this.state.headerHeight) {

                        player.init(ref)
                        this.setState({ headerHeight: true })
                    }
                }}
                anim={this.anim}
                animation={'linear'}
                onchangeIsConnected={(v:any)=>this.props.onchangeIsConnected(v)}
                orientation={this.props.theme.albomeMode}
                itemMini={this.renderBottomSheetheader()} // Pass props component when collapsed
                itemFull={this.props.theme.albomeMode ? this.renderBottomSheetHorizontal() : this.renderBottomSheet()} // Pass props component when show full
                onShowMini={() => {

                    Animated.timing(this.anim, {
                        toValue: 1,
                        duration: 50,
                        useNativeDriver: true
                    }).start();
                }}
                onShowFull={() => {
                    Animated.timing(this.anim, {
                        toValue: 0,
                        duration: 50,
                        useNativeDriver: true
                    }).start();
                }}
                closed={() => { this.closed() }}
                checkIsFovorite={() => this.checkIsFovorite(this.props.bottomReducer.swiperShowRadiostation.id)
                }
                bottomReducer={this.props.bottomReducer}
                backgroundColor={this.props.theme.backgroundColor}
                toaddfavorite={() => { this.props.toaddfavorite(this.props.bottomReducer.swiperShowRadiostation.data) }}
                onMoveUp={() => console.log('up')}
                swipeHeight={this.props.theme.albomeMode ? 76 : 190}
                disablePressToShow={false} // Press item mini to show full
                style={{
                 //   backgroundColor:'red',
                    //height:deviceHeight-80,
                    backgroundColor: 'rgba(255,255,255,0)',
                    flex: 1,
                }} // style for swipe
            />

                )
        }else{
        return (

<View style={{backgroundColor:'red', height:100, position:'absolute', bottom:0}}>

</View>
            //

        )}
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
            dispatch(changeSwiperActiveBi(payload))
        },
        onchangeArtist_Song: (payload: any) => {
            dispatch(chnageplayItemArtistandSong(payload))
        },
        get_songData: (payload: any) => {
            dispatch(getSongData(payload))
        },
        onchangeSelectedRadioStationPlaying: (payload: any) => {
            dispatch(changeSelectedRadioStationPlaying(payload))
        },
        onchangeSwiperShowStation: (payload: any) => {
            dispatch(changeSwiperShowStation(payload))
        },
        onchangeSelectedRadioStation: (payload: any) => {
            dispatch(changeSelectedRadioStation(payload))
        },
        onchangeMiniScreenData: (payload: any) => {
            dispatch(changeMiniScreenData(payload))
        },
        onchangeSelectedSatationbyBi: (payload: any) => {
            dispatch(changeSelectedSatationbyBi(payload))
        },
        onchangeLookingList:(payload:any) => {
            dispatch(changeLookingList(payload))
        },
        onchangeIsConnected:(payload:any) => {
        dispatch(changeIsConnected(payload))
    },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomSwiper);

const styles = StyleSheet.create({
    swiperImage: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor:'red',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.19,
        shadowRadius: 4.65,
        height: 180,
        width:180,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: calcHeight(20),
        width: '80%'
    },
    numbers: {
        height: 28,
        width: 47,
        backgroundColor: '#101C3B',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activenumber: {
        color: '#8B95AF',
        fontSize: 14,
        fontWeight: '500'
    },
    btnPlay: {
        width: 85,
        height: 85,
        backgroundColor: '#101C3B',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    albImg: { height: calcHeight(257), marginTop: calcHeight(24), justifyContent: 'center', alignItems: 'center', },
    modal: {
        height: calcHeight(269.03),
        width: calcWidth(265),
        borderRadius: calcWidth(8),
    },
    btnrecord: {
        width: 68,
        height: 68,
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
        width: (54),
        height: (54),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: (5),
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
      //  paddingLeft: calcWidth(22),
        height: calcHeight(70),
        marginTop: -20,
        justifyContent: 'center',
        width: calcWidth(80), zIndex: 1,
        alignItems:'center'

    },
    recordingTime: {
        marginTop: calcHeight(10)
    }
});