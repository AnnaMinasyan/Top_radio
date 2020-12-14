import React from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import player from "../services/player/PlayerServices"
import { calcFontSize, calcHeight, calcWidth, deviceHeight } from "../assets/styles/dimensions"
import Header from "../components/Header"
import { IMenuProps } from "../Interface"
import {styles} from "./RadiosList"
import {
    getMenuData,
    changeSwiperData, changeLookingList
} from '../store/actions/menuActions'
import {
    changeplayItem,
    changePlayingData,
    changeActiveIndex,
    changeActiveBi,
    getSongData,
    changeSelectedRadioStation,
    changeMiniScreenData,
    changeSwiperShowStation
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
import navigationService from "../navigation/NavigationService"
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
    searchData: any | null
}

class LookingMenu extends React.Component<IMenuProps, IState> {
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
            this.props.onchangeLookingList(looking)
        })
        this.props.ongetMenuData()
    }
    componentDidMount() {
        navigationService.setNavigator(this.props.navigation)
    }


    checkIsFovorite(num: number) {

        return this.props.favorites.includes(num)
    }
    _addLookingList(data: any) {
        getData("isLooking").then((lookList) => {
            let count = true
            if (lookList.length > 0) {
                for (let index = 0; index < lookList.length; index++) {
                    const element = lookList[index];
                    console.log(element.id == data.id);
                    if (element.id == data.id) {

                        console.log(lookList.splice(index, 1));

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
    renderMenuItems(data: any) {
        return <TouchableHighlight
            onPress={() => {
                console.log("ooooo",this.props.bottomReducer.selectedRadioStation && this.props.bottomReducer.selectedRadioStation.id==data.item.id)

                if(this.props.bottomReducer.selectedRadioStation ){
                    let radioStation = {
                        data: data.item,
                        isPlayingMusic: false,
                        activeBi:data.item.st[0],
                        id: data.item.id
                    }
                    player.open()
                    this.props.onchangeSwiperShowStation(radioStation)
                    //
                    // console.log("!this.props.bottomReducer.selectedRadioStation?.isPlayingMusic",!this.props.bottomReducer.selectedRadioStation?.isPlayingMusic)
                    // if(!this.props.bottomReducer.selectedRadioStation?.isPlayingMusic){
                    //     console.log(";;;;;;;;;;;;;;;;;")
                    //     this.props.onchangeMiniScreenData(radioStation)
                    //     this.props.onchangeSwiperShowStation(radioStation)
                    // }else{
                    //
                    // }
                    this.setState({swipeablePanelActive:true})
                    this.props.onchangeActiveIndex(data.index)
                }else{
                    let radioStation = {
                        data: data.item,
                        isPlayingMusic: false,
                        activeBi:data.item.st[0],
                        id: data.item.id
                    }
                    this.props.onchangeSelectedRadioStation(radioStation)
                    //
                    console.log("!this.props.bottomReducer.selectedRadioStation?.isPlayingMusic",!this.props.bottomReducer.selectedRadioStation?.isPlayingMusic)
                    // if(!this.props.bottomReducer.selectedRadioStation?.isPlayingMusic){
                    //     console.log(";;;;;;;;;;;;;;;;;")
                    //     this.props.onchangeMiniScreenData(radioStation)
                    //     this.props.onchangeSwiperShowStation(radioStation)
                    // }else{
                    //
                    // }
                    this.setState({swipeablePanelActive:true})
                    this.props.onchangeActiveIndex(data.index)
                }

            }}>
            <RadioMenuElement
                title={data.item.pa}
                image={data.item.im}
                theme={this.props.theme}
                backColor={this.props.theme.backgroundColor}
                addInFavorite={() => {
                    this.props.toaddfavorite(data.item)
                }}
                isFavorite={this.checkIsFovorite(data.item.id)} />
        </TouchableHighlight >
    }
    renderMenuItemsMenuStyle2(data: any) {
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
                if(this.props.bottomReducer.selectedRadioStation && !this.props.bottomReducer.selectedRadioStation.isPlayingMusic){
                    this.props.onchangeMiniScreenData(radioStation)
                }
                player.open()
                this.props.onchangeActiveIndex(data.index)
            }} style={{ marginRight: calcWidth(16), marginBottom: calcHeight(16), borderRadius: 8 }}>
            <SimpleImage size={98} image={data.item.im} />
        </TouchableHighlight>
    }

    render() {
        const list = this.props.menuReducer.lookingList? this.props.menuReducer.lookingList.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS)):[]
        return (
            <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor, height: Dimensions.get('window').height }]}>
                <Header
                    navigation={this.props.navigation}
                    onchnageSearchData={this.props.onchnageSearchData}
                    title={'Просмотренные'}/>

                    {!this.props.menuReducer.menuData ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: calcHeight(150) }}>
                        <ActivityIndicator size="large" color="#0F1E45" />
                    </View> :
                    this.props.filterReducer.menuType == 1 ?
                        <FlatList
                            data={list}
                            renderItem={(d) => this.renderMenuItems(d)}
                            keyExtractor={(item: any, index: number) => item.id.toString()}
                            maxToRenderPerBatch={10}
                        />:
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
                        /> }

            </View>
        );
    }
};
const mapStateToProps = ({ filterReducer, menuReducer, favorites, theme, settingsReducer, bottomReducer }: any) => {
    return { filterReducer, menuReducer, favorites, theme, settingsReducer, bottomReducer }
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        ongetMenuData: () => {
            dispatch(getMenuData())
        },
        onchangeLookingList:(payload:any) => {
            dispatch(changeLookingList(payload))
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
        onchangeSelectedRadioStation: (payload: any) => {
            dispatch(changeSelectedRadioStation(payload))
        },
        onchangeSwiperShowStation: (payload: any) => {
            dispatch(changeSwiperShowStation(payload))
        },
        onchangeMiniScreenData: (payload: any) => {
            dispatch(changeMiniScreenData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookingMenu);

