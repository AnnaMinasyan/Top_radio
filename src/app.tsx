import React from 'react';
import { enableScreens } from 'react-native-screens';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Navigator from "./navigation/Navigator"
import { storeData, getData } from "./utils/local_storage"
import { connect } from "react-redux"
import { changeswipeablePanelActive } from "./store/actions/filterAction"
import { calcFontSize, calcHeight, calcWidth, deviceHeight } from "./assets/styles/dimensions"
import BottomSheet from 'reanimated-bottom-sheet'
import SimpleImage from "./components/SimpleImage"
import Heart from "./assets/icons/heart.svg"
import PlaySvG from "./assets/icons/play.svg"
import RadioMenuElement from "./components/RadioMenuElement"
import Arrow from "./assets/icons/arrow.svg"
import Stop from "./assets/icons/stop.svg"
import RecordSvg from "./assets/icons/disrecording.svg"
import DisRecordSvg from "./assets/icons/recording.svg"
import InfoSvg from "./assets/icons/infoMenu.svg"
import RedHeart from "./assets/icons/redHeart.svg"
import TrackPlayer from 'react-native-track-player';
import { NavigationScreenProp } from 'react-navigation';
import { useEffect, useState, } from 'react';
import { useSelector,useDispatch } from "react-redux"
import { panelActiveSelector, playItem } from "../src/store/selector/filterSelector"
interface Props {
    onchangeswipeablePanelActive(payload: boolean): void;
    filterReducer: any,
    navigation: NavigationScreenProp<any, any>,

}
// class MyApp extends React.Component<Props, any> {
//     constructor(props: Props) {

//         super(props)
//         this.state = {
//             isPlayingMusic: false
//         }

//     }
//     setData() {
//         this.props.filterReducer.swipeablePanelActive
//         if (this.props.filterReducer.swipeablePanelActive) {
//              this.bs.current.snapTo(1) }else{
//                 this.bs.current.snapTo(0)
//              }
//     }
//     async _startPlayMusic() {
//         console.log("_startPlayMusic", this.state.playUrl);

//         const currentTrack = await TrackPlayer.getCurrentTrack();
//         // if (currentTrack == null) {
//         await TrackPlayer.reset();
//         await TrackPlayer.add({
//             id: "local-track",
//             // url: 'https://us3.internet-radio.com/proxy/cd1019?mp=/stream;',
//             url: this.state.playUrl,
//             title: "Pure (Demo)",
//             artist: "David Chavez",
//             artwork: "https://i.picsum.photos/id/500/200/200.jpg",
//             duration: 28
//         });
//         await TrackPlayer.play();
//     }
//     async _pouseMusic() {
//         console.log("_pouseMusic");
//         const currentTrack = await TrackPlayer.getCurrentTrack();
//         if (this.state.isPlayingMusic) {
//             console.log("playMusic");
//             await TrackPlayer.play();
//         } else {
//             console.log("_pouseMusic");
//             await TrackPlayer.pause();
//         }
//     }
//     _Pause() {
//         TrackPlayer.STATE_PAUSED
//     }
//     bs: any = React.createRef()
//     renderBottomSheetheader() {

//         return <View style={{ height: calcHeight(86), backgroundColor: '#EBEEF7', flexDirection: 'row', justifyContent: 'space-between', paddingRight: calcWidth(12) }}>
//             <TouchableOpacity
//                 onPress={() => { this.bs.current.snapTo(0), this.props.onchangeswipeablePanelActive(false) }}
//                 style={{ height: calcHeight(86), backgroundColor: '#EBEEF7', }}>
//                 <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>

//                     <View style={{ flexDirection: 'row' }}>
//                         <SimpleImage size={calcWidth(47)} />
//                         <View style={{ marginLeft: calcHeight(15) }}>
//                             <Text style={styles.txtTitle}>{this.props.filterReducer.playItem.pa}</Text>
//                             <Text style={[styles.txtTitle, { fontSize: calcFontSize(12), marginTop: calcHeight(5) }]}>Супер хиты. Супер новинки</Text>
//                         </View>
//                     </View>

//                 </View>
//             </TouchableOpacity>
//             <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//                 <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />
//                 <TouchableOpacity
//                     style={[styles.player,]}
//                     onPress={() => {
//                         console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
//                         this._pouseMusic()
//                         this.setState({ isPlayingMusic: !this.state.isPlayingMusic })
//                     }}
//                 >
//                     {this.state.isPlayingMusic ? <Stop width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' /> :
//                         <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' />}
//                     {/* <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' /> */}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     }
//     renderBottomSheet(data: any) {
//         console.log("-------------PPPPPPPPP",this.props.filterReducer.swipeablePanelActive );

//         return <View style={{ backgroundColor: 'white', height: '100%', }}>
//             <View style={styles.bottomSheet}>
//                 <TouchableOpacity
//                     style={{
//                         height: calcHeight(50), justifyContent: 'center',
//                         width: calcWidth(60), zIndex: 1
//                     }}
//                     onPress={() => { this.bs.current.snapTo(1), this.props.onchangeswipeablePanelActive(true) }}

//                 >
//                     <Arrow fill='#1E2B4D' height={calcHeight(10.59)} width={calcWidth(19.8)} />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={{ justifyContent: 'center', alignItems: 'center', height: 40, }}
//                     onPress={() => {
//                         this.setState({ isFavorite: !this.state.isFavorite })
//                     }}
//                 >
//                     {data.isFavorite ?

//                         <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> : <Heart fill='#1E2B4D' height={calcHeight(21.01)} width={calcWidth(23.61)} />}
//                 </TouchableOpacity>
//             </View>
//             <View style={{ marginTop: calcHeight(27), justifyContent: 'center', alignItems: 'center' }}>
//                 {this.props.filterReducer.playItem ? <Text style={{ color: '#1E2B4D', fontSize: calcFontSize(24), fontWeight: '500' }}>{this.props.filterReducer.playItem.pa}</Text> : null}
//             </View>
//             <View style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
//                 <SimpleImage size={calcHeight(257)} />

//             </View>
//             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <Text style={{ color: '#1E2B4D', fontSize: calcFontSize(17) }}>
//                     Супер хиты. Супер новинки
//                 </Text>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
//                 {this.props.filterReducer.playItem.st ? this.props.filterReducer.playItem.st.map((item: any) => {
//                     return <TouchableOpacity
//                         onPress={() => { this.setState({ activBi: item.bi, playUrl: item.ur }) }}
//                         style={item.bi == this.state.activBi ? styles.activeNumbers : [styles.numbers, { marginRight: calcWidth(15) }]}
//                     >
//                         <Text style={styles.activenumber}>{item.bi}</Text>
//                     </TouchableOpacity>
//                 }) : null}
//             </View>
//             <View style={{ alignItems: 'center', marginTop: calcHeight(20), flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity
//                     onPress={() => {
//                         this.setState({ isRecording: !this.state.isRecording })
//                     }}
//                     style={styles.btnrecord}
//                 >
//                     {data.isRecording ?
//                         <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} /> :
//                         <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' />
//                     }
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => {
//                         this.state.isPlayingMusic ? this._pouseMusic() : this._startPlayMusic()
//                         // this._startPlayMusic()
//                         this.setState({ isPlayingMusic: !data.isPlayingMusic })
//                     }}
//                     style={styles.btnPlay}
//                 >
//                     {data.isPlayingMusic && this.state.isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
//                         <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.btnrecord}
//                     onPress={() => {
//                         this.props.navigation?.navigate('MyAlarmClock')
//                     }}
//                 >
//                     <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill='#1E2B4D' />

//                 </TouchableOpacity>

//             </View>
//         </View>
//     }

const MyApp: React.FunctionComponent<Props> = (props) => {

    const [animeted, setanimeted] = useState<boolean | null>(false)
     const [isPlayingMusic, setisPlayingMusic] = useState<boolean>(false)
    const filterReducer = useSelector(panelActiveSelector)
    const dispatch=useDispatch()
    const item = useSelector(playItem)
    console.log(filterReducer.swipeablePanelActive);
    const bs: any = React.createRef()

    useEffect(() => {
        console.log('0000000000000000000000',filterReducer.swipeablePanelActive);
  //      if (bs) {
        //    if (filterReducer.swipeablePanelActive != animeted) {
        //         if (filterReducer.swipeablePanelActive == true) {
                    
        //             //   setanimeted(1)
        //               // bs.current.snapTo(0)
        //         } else {
        //             console.log("bssss", bs==null);
        //         bs.current.snapTo(1)
                
        //         }
               
        //    }

       // }

    },[filterReducer]);
    const _startPlayMusic=async()=> {
     

        const currentTrack = await TrackPlayer.getCurrentTrack();
        // if (currentTrack == null) {
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: "local-track",
            // url: 'https://us3.internet-radio.com/proxy/cd1019?mp=/stream;',
            url: item.st[0].ur,
            title: "Pure (Demo)",
            artist: "David Chavez",
            artwork: "https://i.picsum.photos/id/500/200/200.jpg",
            duration: 28
        });
        await TrackPlayer.play();
        // } 
        // else {
        //     if (this.state.isPlayingMusic) {
        //         await TrackPlayer.play();
        //     } else {
        //         await TrackPlayer.pause();
        //     }
        // }

    }
 const      _pouseMusic =  async() =>  {
        console.log("_pouseMusic");
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (!isPlayingMusic) {
            console.log("playMusic");
            await TrackPlayer.play();
        } else {
            console.log("_pouseMusic");
            await TrackPlayer.pause();
        }
    }
   const _Pause=()=> {
        TrackPlayer.STATE_PAUSED
    }
 
//  const   openPanel=()=> {
//       dispatch( changeswipeablePanelActive(true))
//     }
//     closePanel() {
//         this.props.onchangeswipeablePanelActive(false)
//     }

    const renderBottomSheetheader = () => {


        return <View style={{ height: calcHeight(86), backgroundColor: '#EBEEF7', flexDirection: 'row', justifyContent: 'space-between', paddingRight: calcWidth(12) }}>
            <TouchableOpacity
               onPress={() => {dispatch(changeswipeablePanelActive(true) ) }}
                style={{ height: calcHeight(86), backgroundColor: '#EBEEF7', }}>
                <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <SimpleImage size={calcWidth(47)} />
                        <View style={{ marginLeft: calcHeight(15) }}>
                            <Text style={styles.txtTitle}>{item.pa}</Text>
                            <Text style={[styles.txtTitle, { fontSize: calcFontSize(12), marginTop: calcHeight(5) }]}>Супер хиты. Супер новинки</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />
                <TouchableOpacity
                    style={[styles.player,]}
                onPress={() => {
                    console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
                _pouseMusic()
                setisPlayingMusic(!isPlayingMusic)
                 }}
                >
                    {isPlayingMusic ? <Stop width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' /> :
                                <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' />}
                    {/* <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' /> */}
                </TouchableOpacity>
            </View>
        </View>
    }
   const renderBottomSheet=(data: any)=> {
        
                return <View style={{backgroundColor: 'white' , height: '100%', }}>
                    <View style={styles.bottomSheet}>
                        <TouchableOpacity
                            style={{
                                height: calcHeight(50), justifyContent: 'center',
                                width: calcWidth(60), zIndex: 1
                            }}
                         onPress={() => { bs.current.snapTo(1), dispatch(changeswipeablePanelActive(false) )}}
        
                        >
                            <Arrow fill='#1E2B4D' height={calcHeight(10.59)} width={calcWidth(19.8)} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', height: 40, }}
                            // onPress={() => {
                            //     this.setState({ isFavorite: !this.state.isFavorite })
                            // }}
                        >
                            {data.isFavorite ?
        
                                <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> : <Heart fill='#1E2B4D' height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: calcHeight(27), justifyContent: 'center', alignItems: 'center' }}>
                        {item ? <Text style={{ color: '#1E2B4D', fontSize: calcFontSize(24), fontWeight: '500' }}>{item.pa}</Text> : null}
                    </View>
                    <View style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
                        <SimpleImage size={calcHeight(257)} />
        
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#1E2B4D', fontSize: calcFontSize(17) }}>
                            Супер хиты. Супер новинки
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
                        {/* {this.props.filterReducer.playItem.st ? this.props.filterReducer.playItem.st.map((item: any) => {
                            return <TouchableOpacity
                                onPress={() => { this.setState({ activBi: item.bi, playUrl: item.ur }) }}
                                style={item.bi == this.state.activBi ? styles.activeNumbers : [styles.numbers, { marginRight: calcWidth(15) }]}
                            >
                                <Text style={styles.activenumber}>{item.bi}</Text>
                            </TouchableOpacity>
                        }) : null} */}
                    </View>
                    <View style={{ alignItems: 'center', marginTop: calcHeight(20), flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            // onPress={() => {
                            //     this.setState({ isRecording: !this.state.isRecording })
                            // }}
                            style={styles.btnrecord}
                        >
                            {data.isRecording ?
                                <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} /> :
                                <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                            isPlayingMusic ? _pouseMusic() :_startPlayMusic()
                                // this._startPlayMusic()
                                setisPlayingMusic(!isPlayingMusic)
                            }}
                            style={styles.btnPlay}
                        >
                            { isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                                <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnrecord}
                            onPress={() => {
                              console.log(props);
                               // props.navigation.navigate('MyAlarmClock')
                            }}
                        >
                            <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill='#1E2B4D' />
        
                        </TouchableOpacity>
        
                    </View>
                </View>
            }
    return (

        <SafeAreaView style={{ flex: 1, }}>
            <Navigator />
            {/* <BottomSheet
                ref={bs}
                snapPoints={[deviceHeight - 15, 0, 0]}
                 renderContent={() => renderBottomSheet(item)}
                renderHeader={() => null}
                initialSnap={1}
                enabledInnerScrolling={true}
            onCloseStart={() => dispatch(changeswipeablePanelActive(false))}
            />

            {filterReducer.swipeablePanelActive== false? <View style={{ position: 'absolute', height: calcHeight(86), width: '100%', bottom: 0 }}>
                {renderBottomSheetheader()}
            </View> : null} */}
        </SafeAreaView>
    );
};
export default MyApp;
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0F1E45',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

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
        borderRadius: calcWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: calcWidth(16)
    },
    numbers: {
        height: calcHeight(28),
        width: calcWidth(47),
        backgroundColor: '#101C3B',
        borderRadius: calcWidth(20),
        alignItems: 'center',
        justifyContent: 'center'
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

    bottomSheet: {
        height: calcHeight(30), flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: calcWidth(35),
        paddingRight: calcWidth(30),
        marginTop: calcHeight(10),
    },
    number: {
        color: 'white',
        fontSize: calcFontSize(14),
        fontWeight: '500'
    },
    activenumber: {
        color: '#8B95AF',
        fontSize: calcFontSize(14),
        fontWeight: '500'
    },
    btnPlay: {
        width: calcWidth(85),
        height: calcWidth(85),
        backgroundColor: '#101C3B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginHorizontal: calcWidth(28)
    },
    btnrecord: {
        width: calcWidth(68),
        height: calcWidth(68),
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
    container: {

        backgroundColor: '#6f6f76',

    },
    box: {
        width: 50,
        height: 50,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    commandButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#292929',
        alignItems: 'center',
        margin: 7,
    },
    panel: {
        height: 600,
        padding: 20,
        backgroundColor: '#2c2c2fAA',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    //   header: {
    //     width: '100%',
    //     height: 50,
    //   },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#292929',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    map: {
        height: '100%',
        width: '100%',
    },
});