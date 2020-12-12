import React from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    FlatList,
} from 'react-native';
import { calcFontSize, calcHeight, calcWidth, deviceHeight } from "../assets/styles/dimensions"
import Header from "../components/Header"
import { IMenuProps } from "../Interface"
import {
    changeplayItem,
    changePlayingData,
    getSongData,
    changeActiveIndex, changeMiniScreenData,
    changeSelectedRadioStation
} from "../store/actions/bottomAction";
import {
    getFavorites,
    changeSearchData,
    changePlayingMusic,

} from '../store/actions/filterAction'
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import { createFilter } from 'react-native-search-filter';
import { addFavorites } from '../store/actions/favoritesActions';
import player from "../services/player/PlayerServices"
import Bottom from "../components/Bottom"

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
            return <TouchableHighlight
            onPress={() => {
                let radioStation = {
                    data: data.item,
                    isPlayingMusic: false,
                    activeBi: data.item.st[0],
                    id: data.item.id
                }
                this._addLookingList(data.item)
                this.props.onchangeSelectedRadioStation(radioStation)
                this.props.get_songData(radioStation)
                this.props.onchangeMiniScreenData(radioStation)
                player.open()
                this.props.onchangeActiveIndex(data.index)
            }}
        >
            <RadioMenuElement
             title={data.item.pa}
                image={data.item.im}
                 backColor={this.props.theme.backgroundColor}
                addInFavorite={() => this.props.toaddfavorite(data.item)}
                isFavorite={this.checkIsFovorite(data.item.id)} />
        </TouchableHighlight>
        }   else{
            return null
        }  
       
    }
    renderMenuItemsMenuStyle2(data: any) {
        if(this.checkIsFovorite(data.item.id))  {
        return <TouchableHighlight
            onPress={() => {
                let radioStation = {
                    data: data.item,
                    isPlayingMusic: false,
                    activeBi:data.item.st[0],
                    id: data.item.id
                }
                this._addLookingList(data.item)
                this.props.onchangeSelectedRadioStation(radioStation)
                this.props.get_songData(radioStation)
                this.props.onchangeMiniScreenData(radioStation)
                player.open()
                this.props.onchangeActiveIndex(data.index)
            }} style={{ padding: calcWidth(8), }}>
            <SimpleImage size={calcWidth(98)}  image={data.item.im}/>
        </TouchableHighlight>
         }   else{
            return null
        } 
    }
    render() {
        const list = this.state.favoriteList.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))
        
        return (
            <View style={[styles.container, {backgroundColor: this.props.theme.backgroundColor}]}>
                
                    <Header 
                    navigation={this.props.navigation} 
                     onchnageSearchData={this.props.onchnageSearchData}
                     />
                        {this.props.filterReducer.menuType==1 ?
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
                {this.props.bottomReducer.playItem?
                    //<View style={styles.bottomView}>
                        <Bottom/>
                   // </View>
                :null} 
            </View>
        );
    }
};
const mapStateToProps = ({filterReducer,menuReducer,favorites,theme,bottomReducer}:any) => {
    return {filterReducer,menuReducer,favorites,theme,bottomReducer}
};
const mapDispatchToProps = (dispatch: any) => {
    return {
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
        onchangePlayingData: (payload: any) => {
            dispatch(changePlayingData(payload))
        },
        onchangeActiveIndex: (payload: any) => {
            dispatch(changeActiveIndex(payload))
        },
        get_songData: (payload: any) => {
            dispatch(getSongData(payload))
        },
        onchangeSelectedRadioStation: (payload: any) => {
            dispatch(changeSelectedRadioStation(payload))
        }, onchangeMiniScreenData: (payload: any) => {
            dispatch(changeMiniScreenData(payload))
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