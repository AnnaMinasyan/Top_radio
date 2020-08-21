import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    FlatList,
    SafeAreaView
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth, deviceHeight } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
import { changeMenuType, getMenuData } from '../store/actions/menuActions'
import {
    changeswipeablePanelActive,
    changeplayItem,
    addFavorite,
    getFavorites,
    changeSearchData
} from '../store/actions/filterAction'
import Heart from "../assets/icons/heart.svg"
import PlaySvG from "../assets/icons/play.svg"
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import Player from "./PlaylistScreen"
import RecordSvg from "../assets/icons/disrecording.svg"
import DisRecordSvg from "../assets/icons/recording.svg"
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Arrow from "../assets/icons/arrow.svg"
import Stop from "../assets/icons/stop.svg"
import InfoSvg from "../assets/icons/infoMenu.svg"
import RedHeart from "../assets/icons/redHeart.svg"
import TrackPlayer from 'react-native-track-player';
import BottomSheet from 'reanimated-bottom-sheet'
import menuReducer from '../store/reducers/menuReducer';
import { ThemeColors } from 'react-navigation';
import Bottom from "../components/Bottom"
import { createFilter } from 'react-native-search-filter';
import { addFavorites } from '../store/actions/favoritesActions';
const KEYS_TO_FILTERS = ['pa'];
interface IState {
    radioList: [],
    styleView: boolean,
    swipeablePanelActive: boolean,
    position: any,
    isRecording: boolean,
    isPlayingMusic: boolean,
    isFavorite: boolean,
    playItem: any,
    playUrl: string,
    activBi: number,
    favoriteList: any,
    lookingList: any,
    searchData: any | null
}

class Menu extends React.Component<IMenuProps, IState> {
    constructor(props: IMenuProps) {

        super(props)
        this.state = {
            radioList: [],

            styleView: this.props.menuReducer.styleView,
            swipeablePanelActive: false,
            position: new Animated.Value(0),
            isRecording: false,
            isPlayingMusic: false,
            isFavorite: false,
            playItem: '',
            playUrl: '',
            activBi: 0,
            favoriteList: [],
            lookingList: [],
            searchData: null


        }
        const unsubscribe = props.navigation.addListener('focus', () => {
            console.log("ooooooooooooooooooooooooooo");
            
            this.setData()
        });

    }
    //bs: any = React.createRef()
    setData() {
        getData('menuView').then((menuView) => {
         //   this.bs.current.snapTo(1)

            this.setState({ styleView: menuView })
        })


        getData('favorites').then((favorite) => {
            let favoriteStorage:any =[]
            favorite.map((data: any) => {
                console.log(data);
                
            favoriteStorage.push(data.id)
            })

            this.props.ongetFavorites(favoriteStorage)
        })
        getData('isLooking').then((looking) => {

            this.setState({ lookingList: looking })
        })
        this.props.ongetMenuData()

    }
    async _startPlayMusic() {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        // if (currentTrack == null) {
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: "local-track",
            url: this.state.playUrl,
            title: "Pure (Demo)",
            artist: "David Chavez",
            artwork: "https://i.picsum.photos/id/500/200/200.jpg",
            duration: 28
        });
        await TrackPlayer.play();
        
    }
    async _pouseMusic() {
        console.log("_pouseMusic");
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (this.state.isPlayingMusic) {
            console.log("playMusic");
            await TrackPlayer.play();
        } else {
            console.log("_pouseMusic");
            await TrackPlayer.pause();
        }
    }
    _Pause() {
        TrackPlayer.STATE_PAUSED
    }
    changeViewStyle(res: boolean) {
        //console.log(":::::::::::::::::::", this.props);
    }
    openPanel() {
        this.props.onchangeswipeablePanelActive(true)
    }
    closePanel() {
        this.props.onchangeswipeablePanelActive(false)
    }
    checkIsFovorite(num: number) {        
            return this.props.favorites.includes(num)
      
    }
    _addLookingList(data: any) {
        getData("isLooking").then((lookList) => {
            let count = true
            if (lookList) {

                for (let index = 0; index < lookList.length; index++) {
                    const element = lookList[index];
                    if (element.id == data.id) {
                        count = false
                        break
                    }
                }
                if (count) {
                    lookList.push(data)
                }
            }

            storeData("isLooking", lookList).then(() => {
                this.setState({ lookingList: lookList })
            })

        })
    }
    // }
    renderMenuItems(data: any) {        
        return <TouchableOpacity
            style={{ paddingLeft: calcWidth(29) }}
            onPress={() => {
                // this.bs.current.snapTo(0),
                this.props.onchangeswipeablePanelActive(true)
                this._addLookingList(data.item)
                this.props.onchangeplayItem(data.item)
                this.setState({
                    isPlayingMusic: false,
                    playItem: data.item,
                    activBi: data.item.st[0].bi,
                    playUrl: data.item.st[0].ur
                })
            }}
        >
            <RadioMenuElement title={data.item.pa}
                image={data.item.im} backColor={this.props.filterReducer.backgroundColor}
                addInFavorite={() => this.props.toaddfavorite(data.item)}
                isFavorite={this.checkIsFovorite(data.item.id)} />
        </TouchableOpacity>
    }
    renderMenuItemsMenuStyle2(data: any) {

        return <TouchableOpacity

            onPress={() => {

                //this.bs.current.snapTo(0),
                    this.state.isPlayingMusic ? this._pouseMusic() : null
                this.props.onchangeswipeablePanelActive(true)
                this.props.onchangeplayItem(data.item.data)
                this.setState({
                    isPlayingMusic: false,
                    playItem: data.item.data,
                    activBi: data.item.st[0].bi,
                    playUrl: data.item.st[0].ur
                })
            }} style={{ padding: calcWidth(8), }}>
            <SimpleImage size={calcWidth(98)} />
        </TouchableOpacity>
    }

    chouseList() {
        if (this.props.filterReducer.isFavorite) {
            return this.state.favoriteList
        } else if (this.props.filterReducer.isLooking) {
            return this.state.lookingList
        } else {
            return this.props.menuReducer.menuData
        }
    }
    renderBottomSheetheader = () => {
        return <View style={{ height: calcHeight(86), backgroundColor: this.props.filterReducer.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45', flexDirection: 'row', justifyContent: 'space-between', paddingRight: calcWidth(12) }}>
            <TouchableOpacity
                onPress={() => {
                    //this.bs.current.snapTo(0),
                        this.props.onchangeswipeablePanelActive(true)
                }}
                style={{ height: calcHeight(86), backgroundColor: this.props.filterReducer.backgroundColor == "white" ? '#EBEEF7' : '#0F1E45', }}>
                <View style={{ flexDirection: 'row', paddingTop: calcHeight(15), paddingLeft: calcWidth(25), justifyContent: 'space-between', paddingRight: calcWidth(12) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <SimpleImage size={calcWidth(47)} />
                        <View style={{ marginLeft: calcHeight(15) }}>
                            <Text style={[styles.txtTitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1D2A4B" : 'white' }]}>{this.state.playItem.pa}</Text>
                            <Text style={[styles.txtTitle, { fontSize: calcFontSize(12), marginTop: calcHeight(5), color: this.props.filterReducer.backgroundColor == "white" ? "#1D2A4B" : 'white' }]}>Супер хиты. Супер новинки</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    onPress={() => {

                        this.props.toaddfavorite(this.state.playItem)
                        this.setState({ isFavorite: !this.state.isFavorite })
                    }}
                >
                    {this.checkIsFovorite(this.state.playItem.id) ?
                        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                        <Heart fill='#B3BACE' height={calcHeight(18.54)} width={calcWidth(20.83)} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.player, { backgroundColor: this.props.filterReducer.backgroundColor == "white" ? '#EBEEF7' : '#0D1834' }]}
                    onPress={() => {
                        this._pouseMusic()
                        this.setState({ isPlayingMusic: !this.state.isPlayingMusic })
                    }}
                >
                    {this.state.isPlayingMusic ? <Stop width={calcWidth(16)} height={calcHeight(22)} fill={this.props.filterReducer.backgroundColor == "white" ? '#101C3B' : 'white'} /> :
                        <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill={this.props.filterReducer.backgroundColor == "white" ? '#101C3B' : 'white'} />}
                    {/* <PlaySvG width={calcWidth(16)} height={calcHeight(22)} fill='#101C3B' /> */}
                </TouchableOpacity>
            </View>
        </View>
    }
    
    renderBottomSheet = (data: any) => {

        return <View style={{ backgroundColor: this.props.filterReducer.backgroundColor, height: '100%', }}>
            <View style={styles.bottomSheet}>
                <TouchableOpacity
                    style={{
                        height: calcHeight(50), justifyContent: 'center',
                        width: calcWidth(60), zIndex: 1
                    }}
                    onPress={() => {
                      //  this.bs.current.snapTo(1)
                        this.props.onchangeswipeablePanelActive(false)
                    }}

                >
                    <Arrow fill={this.props.filterReducer.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', height: 40, }}
                    onPress={() => {
                        console.log("ffffff");

                        this.props.toaddfavorite(this.state.playItem)
                        this.setState({ isFavorite: !this.state.isFavorite })
                    }}
                >
                    {this.checkIsFovorite(this.state.playItem.id) ?

                        <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                        <Heart fill={this.props.filterReducer.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: calcHeight(27), justifyContent: 'center', alignItems: 'center' }}>
                {this.state.playItem ?
                    <Text style={{
                        color: this.props.filterReducer.backgroundColor == "white" ? '#1E2B4D' : 'white',
                        fontSize: calcFontSize(24),
                        fontWeight: '500'
                    }}>{this.state.playItem.pa}</Text> : null}
            </View>
            <View style={{ height: calcHeight(323), justifyContent: 'center', alignItems: 'center', }}>
                <SimpleImage size={calcHeight(257)} />

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: this.props.filterReducer.backgroundColor == "white" ? '#1E2B4D' : 'white', fontSize: calcFontSize(17) }}>
                    Супер хиты. Супер новинки
                        </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: calcHeight(23) }}>
                {this.props.filterReducer.playItem.st ? this.props.filterReducer.playItem.st.map((item: any) => {
                    return <TouchableOpacity
                      //  onPress={() => { this.changeRadioStancia(item) }}
                        style={item.bi == this.state.activBi ? [styles.numbers, { marginRight: calcWidth(15) }] : styles.activeNumbers}
                    >
                        <Text style={styles.activenumber}>{item.bi}</Text>
                    </TouchableOpacity>
                }) : null}
            </View>
            <View style={{ alignItems: 'center', marginTop: calcHeight(20), flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ isRecording: !this.state.isRecording })
                    }}
                    style={[styles.btnrecord, { backgroundColor: this.props.filterReducer.backgroundColor == 'white' ? 'white' : '#0F1E45', }]}
                >
                    {data.isRecording ?
                        <DisRecordSvg width={calcWidth(20)} height={calcWidth(20)} /> :
                        <RecordSvg width={calcWidth(20)} height={calcWidth(20)} fill='#FF5050' />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.state.isPlayingMusic ? this._pouseMusic() : this._startPlayMusic()
                        // this._startPlayMusic()
                        this.setState({ isPlayingMusic: !this.state.isPlayingMusic })
                    }}
                    style={[styles.btnPlay,
                    { backgroundColor: this.props.filterReducer.backgroundColor == 'white' ? '#101C3B' : '#0F1E45', }]}
                >
                    {this.state.isPlayingMusic ? <Stop width={calcWidth(24)} height={calcHeight(27)} fill='white' /> :
                        <PlaySvG width={calcWidth(26.66)} height={calcHeight(37)} fill='white' />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btnrecord, { backgroundColor: this.props.filterReducer.backgroundColor == 'white' ? 'white' : '#101C3B', }]}
                    onPress={() => {
                        console.log("this.state", this.state.playItem);
                        this.props.ongetPlayTrackList(this.state.playItem.pl)
                        this.props.navigation.navigate('EfirList')
                    }}
                >
                    <InfoSvg width={calcWidth(29.91)} height={calcHeight(24.22)} fill={this.props.filterReducer.backgroundColor == 'white' ? '#1E2B4D' : 'white'} />

                </TouchableOpacity>

            </View>
        </View>
    }
    render() {
        // const list = this.props.filterReducer.isFavorite ? this.state.favoriteList : this.props.menuReducer.menuData
        const list = this.chouseList().filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))

        console.log("oooo", this.props.filterReducer.swipeablePanelActive);
       // const filteredEmails = this.props.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <SafeAreaView >
                    
            <View style={[styles.container, {backgroundColor: this.props.filterReducer.backgroundColor}]}>
                    <Header 
                    navigation={this.props.navigation} 
                     onchnageSearchData={this.props.onchnageSearchData}
                     />
                    {/* <Search
                        data={this.props.menuReducer.menuData}
                        renderSearchData={(data: any) => this.props.onchnageSearchData(data)} /> */}
                        {this.props.menuReducer.styleView ?
                            <FlatList
                                data={list}
                                renderItem={(d) => this.renderMenuItems(d)}
                                keyExtractor={(item:any) => item.id}
                                maxToRenderPerBatch={10}
                            />
                            :
                            <FlatList
                                data={this.props.menuReducer.menuData}
                                renderItem={(d) => this.renderMenuItemsMenuStyle2(d)}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                                keyExtractor={item => item.id}
                                maxToRenderPerBatch={10}
                            />
                        }
                   
                    {/* <BottomSheet
                ref={this.bs}
                snapPoints={[deviceHeight - 15, 0, 0]}
                 renderContent={() => this.renderBottomSheet(this.state.playItem)}
                renderHeader={() => null}
                initialSnap={1}
                enabledInnerScrolling={true}
            onCloseStart={() => this.props.onchangeswipeablePanelActive(false)}
            />
            
            
            {this.props.filterReducer.swipeablePanelActive == false ?
                    <View style={{ height: calcHeight(86), width: '100%', backgroundColor: 'red' }}>
                        {this.renderBottomSheetheader()}
                    </View> : null} */}
                    <View style={{ position: 'absolute',
                     height: calcHeight(86),
                      width: '100%',
                       bottom: 0 , 
                   }}>
                    <Bottom
                        navigation={this.props.navigation}
                        onCloseStart={() => this.props.onchangeswipeablePanelActive(false)}
                        isFavorite={this.checkIsFovorite(this.props.filterReducer.playItem.id)}
                        playUrl={this.state.playUrl}
                        chnageplayUrl={(data:any)=>{
                            this.setState({playUrl:data})
                        }}
                    />
                     </View>  
            </View>
            </SafeAreaView>
        );
    }
};
const mapStateToProps = ({filterReducer,menuReducer,favorites}:any) => {
    return {filterReducer,menuReducer,favorites}
};
// const mapStateToProps = (state: any) => ({

//     reducer:state


// });
const mapDispatchToProps = (dispatch: any) => {
    return {
        onChangeMenuType: (payload: any) => {
            dispatch(changeMenuType(payload))
        },
        ongetMenuData: () => {
            dispatch(getMenuData())
        },
        onchangeswipeablePanelActive: (payload: boolean) => {
            dispatch(changeswipeablePanelActive(payload))
        },
        onchangeplayItem: (payload: boolean) => {
            dispatch(changeplayItem(payload))
        },
        toaddfavorite: (payload: any) => {
            dispatch(addFavorites(payload))
        },
        ongetFavorites: (payload: any) => {
            dispatch(getFavorites(payload))
        },
        onchnageSearchData: (payload: any) => {
            dispatch(changeSearchData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

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
        height:deviceHeight
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