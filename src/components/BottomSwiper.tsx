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
import { changeswipeablePanelActive } from '../store/actions/filterAction'
import { changeSwiperData } from '../store/actions/menuActions'
import {
    changeplayItem,
    changePlayingData,
    chnageplayItemArtistandSong,
    changeActiveIndex,
    changeActiveBi,
    getSongData,
    changeSelectedRadioStationPlaying,
    changeSwiperShowStation,
    changeSelectedRadioStation,
    changeSwiperActiveBi
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
import { getData } from '../utils/local_storage';
import FileViewer from 'react-native-file-viewer';
var RNFileManager = require('react-native-file-manager');

import BottomSheet from '@gorhom/bottom-sheet';
import SwipeUpDown from '../screens/Swiper';

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
            loading: false
        }
    }
    async componentDidMount() {

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


    }
    checkIsFovorite(num: number) {
        return this.props.favorites.includes(num)
    }
    isPlaying() {
        console.log('his.props.bottomReducer.selectedRadioStation', this.props.bottomReducer.selectedRadioStation);

        if (this.props.bottomReducer.selectedRadioStation.isPlayingMusic) {
            player._pouseMusic()
            this.props.onchangeSelectedRadioStationPlaying(false)
        } else {
            console.log("this.props.bottomReducer.selectedRadioStation.activBi", this.props.bottomReducer.selectedRadioStation.activeBi);

            player._startPlayMusic(this.props.bottomReducer.selectedRadioStation.data, this.props.bottomReducer.selectedRadioStation.activeBi)
            this.props.onchangeSelectedRadioStationPlaying(true)
        }

    }
    lastClickData = Date.now()
    swipeLeft() {
        console.log(this.count);
if(this.count>0){
        let radiostation = {
            data: this.props.menuReducer.filterData[this.count - 1],
            isPlayingMusic: false,
            activeBi: 0,
            id: this.props.menuReducer.filterData[this.count - 1].id,
        }
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
        }
        this.timerHandle =    setTimeout(() => {
            this.props.onchangeSwiperShowStation(radiostation)
            this.props.get_songData(radiostation)

        }, 500)

        if (this.props.settingsReducer.autoPlay) {
            this.setState({
                swiperIndex: this.count - 1,
            })
        }}
    }

    swipeRight() {
        console.log(this.count);

        let radiostation = {
            data: this.props.menuReducer.filterData[this.count + 1],
            isPlayingMusic: false,
            activeBi: 0,
            id: this.props.menuReducer.filterData[this.count + 1].id,
        }
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
        }
        this.timerHandle = setTimeout(() => {
            this.props.onchangeSwiperShowStation(radiostation)
            this.props.get_songData(radiostation)

        }, 500)

        if (this.props.settingsReducer.autoPlay) {
            this.setState({
                swiperIndex: this.count + 1,
            })
        }
    }
    renderBottomSheetheader() {
        return <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity
                style={global_styles.searchbtn}
                onPress={() => {
                    this.props.toaddfavorite(this.props.bottomReducer.selectedRadioStation.data)
                }}
            >
                {this.checkIsFovorite(this.props.bottomReducer.selectedRadioStation.id) ?
                    <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                    <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.player,
                { backgroundColor: this.props.theme.backgroundColor == "white" ? 'white' : '#0D1834' }]}
                onPress={() => {
                    this.isPlaying()
                }}
            >
                {this.props.bottomReducer.selectedRadioStation.isPlayingMusic ? <Stop width={calcWidth(16)} height={calcHeight(22)} fill={this.props.theme.backgroundColor == "white" ? '#101C3B' : 'white'} /> :
                    <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill={this.props.theme.backgroundColor == "white" ? '#101C3B' : 'white'} />}
            </TouchableOpacity>
        </View>
    }
    _navigatePlayList() {
        if (this.props.bottomReducer.swiperShowRadiostation.data.pl) {
            this.props.ongetPlayList(this.props.bottomReducer.swiperShowRadiostation.data)
            this.props.navigation.navigate('PlayList')
        }
    }

    changeRadioStancia(item: any) {
        console.log("==7777777777777777777777==", this.props.bottomReducer.selectedRadioStation);

        this.props.onchangeActiveBi(item)

        player._pouseMusic()
        console.log('kkkkkk', item);
        console.log("==555555555555555555==", this.props.bottomReducer.selectedRadioStation);

        if (this.props.bottomReducer.selectedRadioStation.isPlayingMusic) {
            this.setState({ loading: true })
            console.log("==44444444444==", this.props.bottomReducer.selectedRadioStation.activeBi);

            player._pouseMusic()

            setTimeout(() => {
                console.log("====", this.props.bottomReducer.selectedRadioStation.activeBi);

                player._startPlayMusic(this.props.bottomReducer.selectedRadioStation.data, this.props.bottomReducer.selectedRadioStation.activeBi)
                this.props.onchangeSelectedRadioStationPlaying(true)
                this.setState({ loading: false })
            }, 500);
        }

    }
    showActiveBi() {
        if (this.props.bottomReducer.swiperShowRadiostation.id == this.props.bottomReducer.selectedRadioStation.id) {
            return this.props.bottomReducer.selectedRadioStation.activeBi.bi
        } else {
            return this.props.bottomReducer.swiperShowRadiostation.data.st[0].bi
        }
    }
    renderBottomSheet() {
        return <View style={{
            height: deviceHeight, paddingBottom: calcHeight(250), backgroundColor: this.props.theme.backgroundColor
        }}>
            <View style={{

                paddingBottom: calcHeight(80),
            }}>


                <BackGroundSvg width={deviceWidth} style={{ position: 'absolute', top: calcHeight(-150) }} />
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    {this.count > 0 ?
                        <TouchableOpacity
                            disabled={this.count == 0}
                            onPress={() => {
                                console.log("left");
                                this.count -= 1
                                this.swipeLeft()
                            }}
                            style={styles.arrow}
                        >
                            <Text style={{ fontSize: calcFontSize(40), justifyContent: 'center', color: this.props.theme.backgroundColor == 'white' ? 'grey' : 'white' }}>
                                {"<"}
                            </Text>
                        </TouchableOpacity> : <View style={styles.arrow} />}
                    <View
                        style={{ justifyContent: 'center', alignItems: 'center', marginRight: calcWidth(15) }}>

                        <SimpleImage size={calcHeight(257)} image={this.props.bottomReducer.swiperShowRadiostation.data.im} />
                    </View>
                    {this.count < this.props.menuReducer.menuData.length - 1 ?
                        <TouchableOpacity style={styles.arrow}
                            disabled={this.count == this.props.menuReducer.menuData.length - 1}
                            onPress={() => {
                                console.log("right");
                                this.count += 1
                                this.swipeRight()
                            }}
                        >
                            <Text style={{ fontSize: calcFontSize(40), justifyContent: 'center', color: this.props.theme.backgroundColor == 'white' ? 'grey' : 'white' }}>
                                {">"}
                            </Text>
                        </TouchableOpacity> : <View style={styles.arrow} />}
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: calcWidth(20),
                }}>
                    {this.props.bottomReducer.swiperShowRadiostation.playingSong ?
                        <Text numberOfLines={1} style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17), width: calcWidth(250), textAlign: 'center' }}>
                            {this.props.bottomReducer.swiperShowRadiostation.playingSong.artist}  {this.props.bottomReducer.swiperShowRadiostation.playingSong.song}
                        </Text> : null}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }
                }>

                    {this.props.bottomReducer.swiperShowRadiostation.data.st.map((item: any, index: number) => {
                        return <TouchableOpacity
                            key={index}
                            onPress={() => {
                                console.log(this.props.bottomReducer.swiperShowRadiostation.activeBi);
                                //changeSwiperActiveBi
                                this.changeRadioStancia(item)
                            }}
                            style={item.bi == this.showActiveBi() ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                        >
                            <Text style={styles.activenumber}>{item.bi}</Text>
                        </TouchableOpacity>
                    })}

                </View>
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'center',
            }}>
                <View style={{ marginTop: calcHeight(11) }}>
                    <TouchableOpacity
                        onPress={() => {
                            // if (this.state.isRecording) {
                            //     this.onStopRecord()
                            // } else {
                            //     this.onStartRecord()
                            // }
                            // this.setState({ isRecording: !this.state.isRecording })
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
                                if (this.props.bottomReducer.selectedRadioStation.id == this.props.bottomReducer.swiperShowRadiostation.id) {
                                    this.isPlaying()
                                } else {
                                    player._pouseMusic()
                                    this.setState({ loading: true })
                                    let d = this.props.bottomReducer.swiperShowRadiostation
                                    d.isPlayingMusic = true
                                    console.log("dddddd", d);

                                    this.props.onchangeSelectedRadioStation(d)
                                    setTimeout(() => {
                                        player._startPlayMusic(this.props.bottomReducer.swiperShowRadiostation.data, this.props.bottomReducer.swiperShowRadiostation.data.st[0])


                                        this.setState({ swiperIndex: this.count, loading: false })

                                    }, 500);
                                }

                            }}
                            style={[styles.btnPlay,
                            { backgroundColor: this.props.theme.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', marginTop: calcHeight(5) }]}>
                            {this.props.bottomReducer.selectedRadioStation.id == this.props.bottomReducer.swiperShowRadiostation.id && this.props.bottomReducer.selectedRadioStation.isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                                <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                        </TouchableOpacity>
                }

                <TouchableOpacity
                    // disabled={!this.props.bottomReducer.playItem.pl}
                    style={[styles.btnrecord, { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', marginTop: calcHeight(10) }]}
                    onPress={() => {
                        this._navigatePlayList()
                    }}>
                    <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />
                </TouchableOpacity>
            </View>
        </View>
    }
    render() {
        console.log(this.props.bottomReducer.selectedRadioStation);

        return (

            <SwipeUpDown
                hasRef={(ref: any) => (player.init(ref))}
                anim={this.anim}
                animation={'linear'}
                orientation={this.state.orientation}
                itemMini={this.renderBottomSheetheader()} // Pass props component when collapsed
                itemFull={this.renderBottomSheet()} // Pass props component when show full
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
                swipeHeight={calcHeight(86)}
                disablePressToShow={false} // Press item mini to show full
                style={{ backgroundColor: 'rgba(255,255,255,0)', flex: 1, paddingBottom: calcHeight(10) }} // style for swipe
            />


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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomSwiper);

const styles = StyleSheet.create({
    arrow: { height: calcHeight(100), width: calcWidth(100), justifyContent: 'center', alignItems: 'center' },
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