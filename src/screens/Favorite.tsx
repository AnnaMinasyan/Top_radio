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
    changeSearchData,
    changePlayingMusic
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
    favoriteList:[],
    playItem:[],
    activBi:number,
    playUrl:string
}

class Favorite extends React.Component<IMenuProps, IState> {
    constructor(props: IMenuProps) {

        super(props)
        this.state = {
            favoriteList:[],
            playItem:[],
            activBi:0,
            playUrl:''
        }
        const unsubscribe = props.navigation.addListener('focus', () => {
            
            this.setData()
        });

    }
    //bs: any = React.createRef()
    setData() {
        getData('favorites').then((favorite) => {
           this.setState({favoriteList:favorite})
        })
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
            storeData("isLooking", lookList)

        })
    }
    renderMenuItems(data: any) { 
        if(this.checkIsFovorite(data.item.id))  {
            return <TouchableOpacity
            style={{ paddingLeft: calcWidth(29) }}
            onPress={() => {
                // this.bs.current.snapTo(0),
                this.props.onchangeswipeablePanelActive(true)
               this._addLookingList(data.item)
                this.props.onchangeplayItem(data.item)
                this.props.onchangePlayingMusic(false)
                this.setState({
                    playItem: data.item,
                    activBi: data.item.st[0].bi,
                    playUrl:Array.isArray( data.item.st) ?data.item.st[0].ur: data.item.st
                })
            }}
        >
            <RadioMenuElement
             title={data.item.pa}
                image={data.item.im}
                 backColor={this.props.theme.backgroundColor}
                addInFavorite={() => this.props.toaddfavorite(data.item)}
                isFavorite={this.checkIsFovorite(data.item.id)} />
        </TouchableOpacity>
        }   else{
            return null
        }  
       
    }
    renderMenuItemsMenuStyle2(data: any) {
        if(this.checkIsFovorite(data.item.id))  {
        return <TouchableOpacity
            onPress={() => {
                this.props.onchangeswipeablePanelActive(true)
                // //this._addLookingList(data.item)
                 this.props.onchangeplayItem(data.item)
                this.props.onchangePlayingMusic(false)
                this.setState({
                    playItem: data.item,
                    activBi: data.item.st[0].bi,
                    playUrl:Array.isArray( data.item.st) ?data.item.st[0].ur: data.item.st
                })
            }} style={{ padding: calcWidth(8), }}>
            <SimpleImage size={calcWidth(98)}  image={data.item.im}/>
        </TouchableOpacity>
         }   else{
            return null
        } 
    }

    chouseList() {
      
       
    }
    render() {
        const list = this.state.favoriteList.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))
        console.log(list);
        
        return (
            <SafeAreaView >
            <View style={[styles.container, {backgroundColor: this.props.theme.backgroundColor}]}>
                
                    <Header 
                    navigation={this.props.navigation} 
                     onchnageSearchData={this.props.onchnageSearchData}
                     />
                        {this.props.menuReducer.styleView ?
                            <FlatList
                                data={list}
                                renderItem={(d) => this.renderMenuItems(d)}
                                keyExtractor={(item:any, index:number) => item.id.toString()}
                                maxToRenderPerBatch={10}
                            />
                            :
                            <FlatList
                                data={list}
                                renderItem={(d) => this.renderMenuItemsMenuStyle2(d)}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                                keyExtractor={(item:any, index:number) => item.id.toString()}
                                maxToRenderPerBatch={10}
                            />
                        }
                    <View style={{ position: 'absolute',
                     height: calcHeight(86),
                      width: '100%',
                       bottom: 0 , 
                   }}>
                    {/* <Bottom
                        navigation={this.props.navigation}
                        onCloseStart={() => this.props.onchangeswipeablePanelActive(false)}
                        isFavorite={this.checkIsFovorite(this.props.filterReducer.playItem.id)}
                        playUrl={this.state.playUrl}
                        chnageplayUrl={(data:any)=>{
                            this.setState({playUrl:data})
                        }}
                    /> */}
                     </View>  
            </View>
            </SafeAreaView>
        );
    }
};
const mapStateToProps = ({filterReducer,menuReducer,favorites,theme}:any) => {
    return {filterReducer,menuReducer,favorites,theme}
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
        onchangePlayingMusic: (payload: any) => {
            dispatch(changePlayingMusic(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

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