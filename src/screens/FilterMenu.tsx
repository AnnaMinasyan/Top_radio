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
import { IFilterMenuProps } from "../Interface"
import { changeMenuType, getMenuData } from '../store/actions/menuActions'
import {changeswipeablePanelActive} from '../store/actions/filterAction'
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
import FilterDrawer from '../navigation/FilterDrawer';

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
    lookingList:any
}

class FilterMenu extends React.Component<IFilterMenuProps, IState> {
    constructor(props: IFilterMenuProps) {

        super(props)
        this.state = {
            radioList: [],
            //   radioList:    [
            //         'Новое радио',
            //         'Радио Energy',
            //         'Русское радио',
            //         'Европа Плюс',
            //         'Новое радио',
            //         'Радио Energy',
            //         'Русское радио',
            //         'Европа Плюс',
            //         'Европа Плюс',
            //         'Европа Плюс',
            //         'Европа Плюс',
            //         'Радио Energy',
            //         'Русское радио',
            //         'Европа Плюс',
            //         'Радио Energy',
            //         'Русское радио',
            //         'Европа Плюс',

            //     ],
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
            lookingList:[]


        }
        const unsubscribe = props.navigation.addListener('focus', () => {
            this.setData()
        });

    }
    animete: any = React.createRef()
    setData() {
        getData('menuView').then((menuView) => {
            this.setState({ styleView: menuView })
        })
        this.props.ongetMenuData()
    }
    checkIsFovorite(id: number) {
        // if( this.state.favoriteList){
        for (let index = 0; index < this.state.favoriteList.length; index++) {
            const element = this.state.favoriteList[index];
            if (element.id == id) {
                return true

            }
        }
        return false
    }
_addLookingList(data:any){
    getData("isLooking").then((lookList) => {
        let count =true
        if (lookList  ) {
           
         for (let index = 0; index < lookList.length; index++) {
             const element = lookList[index];
             if(element.id==data.id){
                count=false
                break
             }
         }
        if (count) {
            lookList.push(data)
        }
        }
        
        storeData("isLooking",lookList).then(()=>{
            this.setState({lookingList:lookList})
        })
        
      })
}
    // }
    renderMenuItems(data: any) {

        return <TouchableOpacity
            onPress={() => {

               // this.bs.current.snapTo(0),
                this.props.onchangeswipeablePanelActive(false)
                this._addLookingList(data.item)
                    // this.state.isPlayingMusic? this._pouseMusic():null
                    this.setState({
                    
                        isPlayingMusic: false,
                        playItem: data.item,
                        activBi: data.item.st[0].bi,
                        playUrl: data.item.st[0].ur
                    })
            }}
        >
            <RadioMenuElement  backColor={this.props.filterReducer.backgroundColor}title={data.item.pa} image={data.item.im} addInFavorite={() => this._addInFavorite(data.item)} isFavorite={this.state.favoriteList?this.checkIsFovorite(data.item.id):false} />
        </TouchableOpacity>
    }
    renderMenuItemsMenuStyle2(data: any) {

        return <TouchableOpacity
            onPress={() => {

              //  this.bs.current.snapTo(0),
                    // this.state.isPlayingMusic? this._pouseMusic():null
                    this.props.onchangeswipeablePanelActive(false)
                    this.setState({
                        isPlayingMusic: false,
                        playItem: data.item,
                        activBi: data.item.st[0].bi,
                        playUrl: data.item.st[0].ur
                    })
            }} style={{ padding: calcWidth(8), }}>
            <SimpleImage size={calcWidth(98)} />
        </TouchableOpacity>
    }
    _addInFavorite(data: any) {

        getData('favorites').then((favorite) => {
            let count=false
            if (favorite  && favorite.length > 0) {
                for (let index = 0; index < favorite.length; index++) {
                    const element = favorite[index];
                    console.log(element.id, data.id);

                    if (element.id == data.id) {
                        console.log("hanel");
                        count=true
                        // favorite.splice(index, 1);
                       
                    } 
                    if (count) {
                        console.log("haneeeeeeeeeeeeeeeeeeeeeeeeeeeeeel");
                        
                        favorite.splice(index, 1)
                        break
                    }
                }
                // console.log("tttttttttttttttttttt");
                // 
                  
                if (count==false) {
                    favorite.push(data)
                }
            } else {
                
                
                favorite.push(data)
            }

            storeData("favorites", favorite).then(()=>{
                console.log("favoritesfavorites",favorite.length);
                
                this.setState({favoriteList:favorite})
            })
        })
    }
  
    render() {
 const list = this.props.filterReducer.isFavorite ? this.state.favoriteList : this.props.menuReducer.filterData
console.log(this.props.menuReducer.filterData);

        return (

            <View style={styles.container}>
                <View style={{ backgroundColor: this.props.filterReducer.backgroundColor }}>
                    <Header />
                    <Search />
                    <SafeAreaView style={{ height: '85%' }}>
                        {this.props.menuReducer.styleView ?

                            <FlatList
                                data={list}
                                renderItem={(d) => this.renderMenuItems(d)}

                                //renderItem={this.renderMenuItems}
                                keyExtractor={item => item.id}
                                maxToRenderPerBatch={10}
                            />
                            :
                            <FlatList
                                data={this.props.menuReducer.menuData}
                                renderItem={(d) => this.renderMenuItemsMenuStyle2(d)}
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                                //renderItem={this.renderMenuItems}
                                keyExtractor={item => item.id}
                                maxToRenderPerBatch={10}
                            />

                        }
                    </SafeAreaView>
                   

                </View>
             

            </View>
        );
    }
};
const mapStateToProps = (state: any) => {
    return state
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
        onchangeswipeablePanelActive: (payload:boolean) => {
            dispatch(changeswipeablePanelActive(payload))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);

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