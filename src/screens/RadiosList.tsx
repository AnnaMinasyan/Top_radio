import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing,
    TouchableHighlight,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Image,
    Button
} from 'react-native';
import player from "../services/player/PlayerServices"
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth, deviceHeight } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
import {
    getMenuData,
    
    changeSwiperData
} from '../store/actions/menuActions'
import {    changeplayItem,
    changePlayingData,
    changeActiveIndex,
        changeActiveBi,
        getSongData
} from "../store/actions/bottomAction";
import {
    changeswipeablePanelActive,

    addFavorite,
    getFavorites,
    changeSearchData,
    changePlayingMusic
} from '../store/actions/filterAction'
import Heart from "../assets/icons/heart.svg"
import PlaySvG from "../assets/icons/play.svg"
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import Bottom from "../components/Bottom"
import { createFilter } from 'react-native-search-filter';
import { addFavorites } from '../store/actions/favoritesActions';

const KEYS_TO_FILTERS = ['pa'];
interface IState {
    radioList: [],
    styleView: boolean,
    swipeablePanelActive: boolean,
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
            this.setData()
        });
    }
    setData() {
        getData('menuView').then((menuView) => {
            this.setState({ styleView: menuView })
        })
        getData('isLooking').then((looking) => {
            this.setState({ lookingList: looking })
        })
        this.props.ongetMenuData()
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
            if (lookList.length>0) {
                console.log(lookList);
             for (let index = 0; index < lookList.length; index++) {
                 const element = lookList[index];
                 console.log(element.id==data.id);
                 if(element.id==data.id){
                     
                     console.log(lookList.splice(index,1));
                     
                 }
             }
             lookList.push(data)
 
            }else{
                lookList.push(data)
            }

            storeData("isLooking", lookList).then(() => {
                this.setState({ lookingList: lookList })
            })

        })
    }
    renderMenuItems(data: any) {
        return <TouchableHighlight
            onPress={() => {
                
                this.props.onchangeplayItem(data.item)
              this.props.onchangeActiveIndex(data.index)
this.props.get_songData(data.item)
               //this.props.onchangePlayingData(data.item)
                player.open()
               // this.props.onchangePlayingMusic(false)
                this._addLookingList(data.item)
                // if (this.props.settingsReducer.autoPlay) {
                //     this.props.onchangePlayingMusic(true)
                //     setTimeout(() => {
                //         player._startPlayMusic(this.props.bottomReducer.playItem,this.props.bottomReducer.playingMusicArtistSong)
                //         this.props.onchangePlayingMusic(true)
        
                //        }, 100);
                // } else {
                //     

                // }
               
            }}
        >
            <RadioMenuElement
                title={data.item.pa}
                image={data.item.im}
                backColor={this.props.theme.backgroundColor}
                addInFavorite={() =>{ console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                 this.props.toaddfavorite(data.item)}}
                isFavorite={this.checkIsFovorite(data.item.id)} />
        </TouchableHighlight >
    }
    renderMenuItemsMenuStyle2(data: any) {
        return <TouchableHighlight

            onPress={() => {
                             
                this.props.get_songData(data.item)

                this.props.onchangeplayItem(data.item)
            /// this.props.onchangeActiveIndex(data.item.st[0].bi)
                let swiper: any = []
                this.props.onchangeActiveIndex(data.index)
                player.open()   
                 this.props.onchangePlayingMusic(false)
                // this.props.onchangePlayingData(data.item)
               
            }} style={{ marginRight: calcWidth(16), marginBottom: calcHeight(16), borderRadius: 8 }}>
            <SimpleImage size={calcWidth(98)} image={data.item.im} />
        </TouchableHighlight>
    }
    chouseList() {
        if (this.props.filterReducer.isActive == "looking") {
            return this.state.lookingList.reverse()
        } else {
            return this.props.menuReducer.menuData
        }
    }
    render() {
        const list = this.props.menuReducer.menuData!=null?this.chouseList().filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS)):[]


        return (
            <SafeAreaView >
                <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
                    <Header
                        navigation={this.props.navigation}
                        onchnageSearchData={this.props.onchnageSearchData}
                    />
                  {
                      !this.props.menuReducer.menuData?
                      <View style={{ justifyContent:'center', alignItems:'center', marginTop:calcHeight(150)}}>
                       <ActivityIndicator size="large" color="#0F1E45" />
                      </View>:
                         this.props.filterReducer.menuType == 1 ?
                            <FlatList
                                data={list}
                                renderItem={(d) => this.renderMenuItems(d)}
                                keyExtractor={(item: any, index: number) => item.id.toString()}
                                maxToRenderPerBatch={10}
                            />
                            :
                            <FlatList
                                data={list}
                                renderItem={(d) => this.renderMenuItemsMenuStyle2(d)}
                                contentContainerStyle={{
                                    width: '100%',
                                   flexWrap: 'wrap',
                                   flexDirection: 'row',
                                    paddingLeft: calcWidth(15),
                                    paddingTop: calcHeight(8),
                                    justifyContent: 'center'
                                }}
                                keyExtractor={(item: any, index: number) => item.id.toString()}
                                maxToRenderPerBatch={10}
                            />
                        
                  } 
                 
                
                    {this.props.bottomReducer.playItem?
                    //<View style={styles.bottomView}>
                        <Bottom
                        navigation={this.props.navigation}
                        />
                   // </View>
                :<View/>} 
                </View>
            </SafeAreaView>
        );
    }
};
const mapStateToProps = ({ filterReducer, menuReducer, favorites, theme, settingsReducer,bottomReducer }: any) => {
    return { filterReducer, menuReducer, favorites, theme, settingsReducer,bottomReducer }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
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
        onchangePlayingMusic: (payload: any) => {
            dispatch(changePlayingMusic(payload))
        },
        onchangeActiveBi: (payload: number) => {
            dispatch(changeActiveBi(payload))
        },
        onchangeActiveIndex: (payload: number) => {
            dispatch(changeActiveIndex(payload))
        },
        onchangeSwiperData: (payload: any) => {
            dispatch(changeSwiperData(payload))
        },
        onchangePlayingData: (payload: any) => {
            dispatch(changePlayingData(payload))
        },
        get_songData: (payload: any) => {
            dispatch(getSongData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
    container1: {
        
        height:deviceHeight+50,
        backgroundColor: 'red',
       
      },
    header: {
        backgroundColor: '#0F1E45',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    bottomView: {
        position: 'absolute',

        width: '100%',
        bottom: 0,
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
        height: deviceHeight - calcHeight(24)
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