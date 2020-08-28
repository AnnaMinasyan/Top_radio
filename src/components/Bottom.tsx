import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,SafeAreaView,
    StatusBar
} from 'react-native';
import Heart from "../assets/icons/heart.svg"
import Modal from 'react-native-modal';
import { calcFontSize, calcHeight, calcWidth, deviceHeight,deviceWidth } from "../assets/styles/dimensions"
import { connect } from "react-redux"
import { changeFavoriteType,changePlayingMusic } from '../store/actions/filterAction'
import { NavigationScreenProp } from 'react-navigation';
import RedHeart from "../assets/icons/redHeart.svg"
import SimpleImage from "./SimpleImage"
import PlaySvG from "../assets/icons/play.svg"
import Stop from "../assets/icons/stop.svg"
import { changeswipeablePanelActive } from '../store/actions/filterAction'
import Arrow from "../assets/icons/arrow.svg"
import RecordSvg from "../assets/icons/disrecording.svg"
import DisRecordSvg from "../assets/icons/recording.svg"
import TrackPlayer from 'react-native-track-player';
import InfoSvg from "../assets/icons/infoMenu.svg"
import {getPlayList} from "../store/actions/playlistAction"
import { addFavorites } from '../store/actions/favoritesActions';
import BackGroundSvg from "../assets/icons/background.svg"
import global_styles from "../assets/styles/global_styles"

interface Props {
    onCloseStart(): void;
    navigation: NavigationScreenProp<any, any>;
    filterReducer: any,
    toaddfavorite(type: any): void;
    onchangeswipeablePanelActive(type: any): void;
    isFavorite: boolean,
    playUrl: string,
    theme:any
    chnageplayUrl(type: any): void;
    ongetPlayList(type: any): void;
    onchangePlayingMusic(type: boolean): void;

}
interface IState {
    hideMenuModal: boolean,
    menuStyle: boolean,
    isRecording: boolean,
    activBi: number,
}
class Bottom extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hideMenuModal: false,
            menuStyle: true,
            isRecording: false,
            activBi: 0,
        }
    }
    hideMenuModal() {
        return <View style={{ backgroundColor: this.props.theme.backgroundColor, height: '100%', }}>

            <TouchableOpacity
                onPress={() => {
                    this.props.toaddfavorite(this.props.filterReducer.playItem)
                    this.props.onchangeswipeablePanelActive(false)
                }}
            >
                <Text>favorite</Text>
            </TouchableOpacity>
        </View>
    }
    renderBottomSheetheader = () => {
        return <View style={{ height: calcHeight(86), backgroundColor: this.props.theme.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45', flexDirection: 'row', justifyContent: 'space-between', paddingRight: calcWidth(12) }}>
            <TouchableOpacity
                onPress={() => {                    
                    this.props.onchangeswipeablePanelActive(true)
                }}
                style={{ height: calcHeight(86),width:calcWidth(270), backgroundColor: this.props.theme.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45', }}>
                <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <SimpleImage size={calcWidth(47)} image={this.props.filterReducer.playItem.im} />
                        <View style={{ marginLeft: calcHeight(15) }}>
                            <Text style={[styles.txtTitle,{color:this.props.theme.backgroundColor=="white"?"#1D2A4B":'white'}]}>{this.props.filterReducer.playItem.pa}</Text>
                            <Text style={[styles.txtTitle, { fontSize: calcFontSize(12), marginTop: calcHeight(5), color: this.props.theme.backgroundColor == "white" ? "#1D2A4B" : 'white' }]}>Супер хиты. Супер новинки</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                style={global_styles.searchbtn}
           onPress={()=>{
            this.props.toaddfavorite(this.props.filterReducer.playItem)
           }}
           >
           {this.props.isFavorite?
        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />}
           </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.player, 
                        { backgroundColor: this.props.theme.backgroundColor == "white" ? 'white' : '#0D1834' }]}
                    onPress={() => {
                    this._pouseMusic()
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

        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (this.props.filterReducer.isPlayingMusic) {
            console.log("playMusic");
            await TrackPlayer.play();
        } else {
            console.log("_pouseMusic");
            await TrackPlayer.pause();
        }
    }
    async _startPlayMusic() {
        console.log(this.props.playUrl);
        
        const currentTrack = await TrackPlayer.getCurrentTrack();
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: "local-track",
            url: this.props.playUrl,
            title: "Pure (Demo)",
            artist: "David Chavez",
            artwork: "https://i.picsum.photos/id/500/200/200.jpg",
            duration: 28
        });
        await TrackPlayer.play();
    }
    changeRadioStancia(item: any) {
        this.props.chnageplayUrl(item.ur)
        this.setState({ activBi: item.bi })
        this._pouseMusic()
        setTimeout(() => {
            this._startPlayMusic()
        }, 3000);
    }
    _navigatePlayList(){
        if (this.props.filterReducer.playItem.pl) {
            this.props.ongetPlayList(this.props.filterReducer.playItem.pl)
        this.props.navigation.navigate('PlayList')
        this.props.onchangeswipeablePanelActive(false)
        }
    }
    renderBottomSheet  ()  {
        return  <SafeAreaView >
        <StatusBar barStyle='dark-content' backgroundColor="white" /><View 
        style={{ 
            backgroundColor: this.props.theme.backgroundColor,  
            height:deviceHeight, width:deviceWidth+10}}>
            <View style={styles.bottomSheet}>
                <TouchableOpacity
                    style={{
                        paddingLeft:calcWidth(22),
                        height: calcHeight(70), 
                        justifyContent: 'center',
                        width: calcWidth(80), zIndex: 1,
                       // borderWidth:1
                    }}
                    onPress={() => {
                        this.props.onchangeswipeablePanelActive(false)
                    }}>
                    <Arrow fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', height: calcHeight(70),width:calcWidth(80) }}
                    onPress={() => {
                        this.props.toaddfavorite(this.props.filterReducer.playItem)
                    }}>
                    {this.props.isFavorite ?
                        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                        <Heart fill={this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: calcHeight(27), justifyContent: 'center', alignItems: 'center' }}>
                {this.props.filterReducer.playItem ?
                    <Text style={{
                        color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white',
                        fontSize: calcFontSize(24),
                        fontWeight: '500'
                    }}>{this.props.filterReducer.playItem.pa}</Text> : null}
            </View>
            <BackGroundSvg  width={deviceWidth} style={{position:'absolute',top:calcHeight(-40)}}/>
            <View style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
                <SimpleImage size={calcHeight(180)} image={this.props.filterReducer.playItem.im} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: this.props.theme.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>
                    Супер хиты. Супер новинки
                        </Text>
            </View>
            {
               Array.isArray( this.props.filterReducer.playItem.st)?
               <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
               {this.props.filterReducer.playItem.st ? 
               this.props.filterReducer.playItem.st.map((item: any) => {
                   return <TouchableOpacity
                       onPress={() => { this.changeRadioStancia(item)
                   }}
                       style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                   >
                       <Text style={styles.activenumber}>{item.bi}</Text>
                   </TouchableOpacity>
               }) : null}
           </View>:null
            }
            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
                {this.props.filterReducer.playItem.st ? this.props.filterReducer.playItem.st.map((item: any,index:number) => {
                    return <TouchableOpacity
                        onPress={() => { this.changeRadioStancia(item)
                    }}
                        style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                    >
                        <Text style={styles.activenumber}>{item.bi}</Text>
                    </TouchableOpacity>
                }) : null}
            </View> */}
            <View style={{ alignItems: 'center', marginTop: calcHeight(20), flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ isRecording: !this.state.isRecording })
                    }}
                    style={[styles.btnrecord, 
                        { backgroundColor: this.props.theme.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                >
                    {this.props.filterReducer.playItem.isRecording ? 
                    <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' />:
                        <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} /> 
                       
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.filterReducer.isPlayingMusic ? this._pouseMusic() : this._startPlayMusic()
                        this.props.onchangePlayingMusic(!this.props.filterReducer.isPlayingMusic )
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
        </View>
        </SafeAreaView >
    }
    bs: any = React.createRef()
    render() {
        
        return (
            <View style={{ position: 'absolute',
            height: calcHeight(86),
             width: '100%',
              bottom: 0 , 
          }}>
                {this.props.filterReducer.swipeablePanelActive ==false ?
                    <View style={{ height: calcHeight(86), width: '100%', backgroundColor: 'red' }}>
                        {this.renderBottomSheetheader()}
                    </View> : null}
                <Modal
               animationInTiming	={500}
                animationOutTiming={500}
                    isVisible={this.props.filterReducer.swipeablePanelActive?this.props.filterReducer.swipeablePanelActive:false}
                    backdropOpacity={0.8}
                    style={{  height:deviceHeight, 
                        width:deviceWidth+10,
                        backgroundColor:'red',
                    marginLeft:0}}
                >
                    {this.renderBottomSheet()}
                </Modal>
            </View>
        );
    }
};
const mapStateToProps = ({filterReducer, favorites,theme}: any) => {
    return {filterReducer,favorites,theme}
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Bottom);

const styles = StyleSheet.create({
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
        height: calcHeight(30), flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
       marginTop: calcHeight(20),
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
        width: calcWidth(85),
        height: calcWidth(85),
        backgroundColor: '#101C3B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginHorizontal: calcWidth(28)
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
       marginLeft: calcWidth(5)
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