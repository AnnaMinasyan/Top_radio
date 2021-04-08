import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import player from "../services/player/PlayerServices";
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceHeight,
} from "../assets/styles/dimensions";
import Header from "../components/Header";
import { IMenuProps } from "../Interface";
import {
  getMenuData,
  changeSwiperData,
  changeLookingList,
  changeSearchData
} from "../store/actions/menuActions";
import {
  changeplayItem,
  changePlayingData,
  changeActiveIndex,
  changeActiveBi,
  getSongData,
  changeSelectedRadioStation,
  changeMiniScreenData,
  changeSwiperShowStation,
} from "../store/actions/bottomAction";
import {
  getFavorites,
  changePlayingMusic,
} from "../store/actions/filterAction";
import RadioMenuElement from "../components/RadioMenuElement";
import { storeData, getData } from "../utils/local_storage";
import SimpleImage from "../components/SimpleImage";
import { connect } from "react-redux";
import { createFilter } from "react-native-search-filter";
import { addFavorites } from "../store/actions/favoritesActions";
import navigationService from "../navigation/NavigationService";
const KEYS_TO_FILTERS = ["pa"];

interface IState {
  radioList: [];
  styleView: boolean;
  swipeablePanelActive: boolean;
  isPlayingMusic: boolean;
  isFavorite: boolean;
  playItem: any;
  playUrl: string;
  activBi: number;
  favoriteList: any;
  lookingList: any;
  searchData: any | null;
  searchvalue: string;
  data:any
}

class Menu extends React.Component<IMenuProps, IState> {
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      radioList: [],
      styleView: this.props.menuReducer.styleView,
      swipeablePanelActive: false,
      isPlayingMusic: false,
      isFavorite: false,
      playItem: "",
      playUrl: "",
      activBi: 0,
      favoriteList: [],
      searchData: null,
      searchvalue: "",
      data:[]
    };
    const unsubscribe = props.navigation.addListener("focus", () => {
      this.setData();
    });
  }
  setData() {
    getData("menuView").then((menuView) => {
      this.setState({ styleView: menuView });
    });

    this.props.ongetMenuData();
    getData("isLooking").then((looking) => {
      if (looking) {
        this.props.onchangeLookingList(looking);
      }
    });
  }
  componentDidMount() {
    navigationService.setNavigator(this.props.navigation);
  }

  checkIsFovorite(num: number) {
    return this.props.favorites.includes(num);
  }
  _addLookingList(data: any) {
    getData("isLooking").then((lookList) => {
      let count = true;
      if (lookList.length > 0) {
        for (let index = 0; index < lookList.length; index++) {
          const element = lookList[index];
          if (element.id == data.id) {
            lookList.splice(index, 1);
          }
        }
        lookList.push(data);
      } else {
        lookList.push(data);
      }
      storeData("isLooking", lookList).then(() => {
        this.props.onchangeLookingList(lookList);
      });
    });
  }
  renderMenuItems(data: any) {
    return (
      <TouchableHighlight
        onPress={() => {
          // console.log("::::::::::::::::::::::");
      
          this._addLookingList(data.item);
          let radioStation = {
            data: data.item,
            isPlayingMusic: false,
            activeBi: data.item.st[0],
            id: data.item.id,
            index:data.index,
          };
          let info={
            radioStation:radioStation,
            index:data.index,
            isPlayingMusic:this.props.bottomReducer.selectedRadioStation?.isPlayingMusic,
            search:this.state.searchvalue
          }
          player.open(info);
          
        }}
      >
        <RadioMenuElement
          showFavoriteHeart={true}
          title={data.item.pa}
          image={data.item.im}
          theme={this.props.theme}
          backColor={this.props.theme.backgroundColor}
          addInFavorite={() => {
            console.log("press",data.item)
            this.props.toaddfavorite(data.item);

          }}
          isFavorite={this.checkIsFovorite(data.item.id)}
        />
      </TouchableHighlight>
    );
  }
  renderMenuItemsMenuStyle2(data: any) {
    return (
      <TouchableHighlight
        onPress={() => {
     
            this._addLookingList(data.item);
            let radioStation = {
              data: data.item,
              isPlayingMusic: false,
              activeBi: data.item.st[0],
              id: data.item.id,
              index:data.item.index,
            };
            let info={
              radioStation:radioStation,
              index:data.item.index,
              isPlayingMusic:this.props.bottomReducer.selectedRadioStation?.isPlayingMusic,
              search:this.state.searchvalue
            }
            
            player.open(info);
          }   
        
        }
        style={{
          marginRight: calcWidth(16),
          marginBottom: calcHeight(16),
          borderRadius: 8,
        }}
      >
        <SimpleImage size={98} image={data.item.im} />
      </TouchableHighlight>
    );
  }
  chouseList() {
    if (this.props.filterReducer.isActive == "looking") {
      return this.props.menuReducer.lookingList.reverse();
    } else {
      return this.props.menuReducer.menuData;
    }
  }

  _changeSearchData(text: string) {
    this.setState({ searchvalue: text });
    let data=this.props.menuReducer.menuData
    data.filter((i:any)=>i.pa.toLowerCase().includes(text.toLowerCase()))
    this.props.onchangeSearchData(data.filter((i:any)=>i.pa.toLowerCase().includes(text.toLowerCase())))

  }
  render() {    
    
    return (
      <KeyboardAvoidingView>
        <View
          style={[
            styles.container,
            {
              backgroundColor: this.props.theme.backgroundColor,
              height: Dimensions.get("window").height,
             
            },
          ]}
        >
          <Header
            searchvalue={this.state.searchvalue}
            changeSearchData={(text) => {
              this._changeSearchData(text);
            }}
            navigation={this.props.navigation}
            onchnageSearchData={this.props.onchnageSearchData}
            clearSearchData={()=>{ 
             this._changeSearchData ("")}}
          />

          {!this.props.menuReducer.menuData ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: calcHeight(150),
              }}
            >
              <ActivityIndicator size="large" color="#0F1E45" />
            </View>
          ) : this.props.filterReducer.menuType == 1 ? (
            <FlatList
            key={'_'}
              onEndReachedThreshold={0.01}
              data={this.props.menuReducer.searchData}
              renderItem={(d) => this.renderMenuItems(d)}
              keyExtractor={(item: any, index: number) => item.id.toString()}
              maxToRenderPerBatch={10}
              onEndReached={(info) => {
                console.log(info);
              }}

            />
          ) : (
            <FlatList
            key={'#'}
              onEndReachedThreshold={0.01}
              data={this.props.menuReducer.searchData}
              renderItem={(d) => this.renderMenuItemsMenuStyle2(d)}
              contentContainerStyle={{
                width: "100%",
                
                paddingLeft: calcWidth(30),
                paddingTop: calcHeight(8),
                justifyContent: "center",
              }}
              numColumns={3}

              keyExtractor={(item: any, index: number) => item.id.toString()}
              maxToRenderPerBatch={10}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = ({
  filterReducer,
  menuReducer,
  favorites,
  theme,
  settingsReducer,
  bottomReducer,
}: any) => {
  return {
    filterReducer,
    menuReducer,
    favorites,
    theme,
    settingsReducer,
    bottomReducer,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    ongetMenuData: () => {
      dispatch(getMenuData());
    },
    onchangeLookingList: (payload: any) => {
      dispatch(changeLookingList(payload));
    },
    onchangeplayItem: (payload: boolean) => {
      dispatch(changeplayItem(payload));
    },
    toaddfavorite: (payload: any) => {
      dispatch(addFavorites(payload));
    },
    ongetFavorites: (payload: any) => {
      dispatch(getFavorites(payload));
    },
    onchnageSearchData: (payload: any) => {
      dispatch(changeSearchData(payload));
    },
    onchangePlayingMusic: (payload: any) => {
      dispatch(changePlayingMusic(payload));
    },
    onchangeActiveBi: (payload: number) => {
      dispatch(changeActiveBi(payload));
    },
    onchangeActiveIndex: (payload: number) => {
      dispatch(changeActiveIndex(payload));
    },
    onchangeSwiperData: (payload: any) => {
      dispatch(changeSwiperData(payload));
    },
    onchangePlayingData: (payload: any) => {
      dispatch(changePlayingData(payload));
    },
    get_songData: (payload: any) => {
      dispatch(getSongData(payload));
    },
    onchangeSelectedRadioStation: (payload: any) => {
      dispatch(changeSelectedRadioStation(payload));
    },
    onchangeSwiperShowStation: (payload: any) => {
      dispatch(changeSwiperShowStation(payload));
    },
    onchangeMiniScreenData: (payload: any) => {
      dispatch(changeMiniScreenData(payload));
    },
    onchangeSearchData: (payload: any) => {
        dispatch(changeSearchData(payload));
      },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

export const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "red",
  },
  header: {
    backgroundColor: "#0F1E45",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  bottomView: {
    backgroundColor: "red",
    height: calcHeight(100),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtTitle: {
    fontSize: calcFontSize(15),
    fontWeight: "500",
    fontFamily: "Roboto",
    color: "#1D2A4B",
  },
  player: {
    backgroundColor: "white",
    width: calcHeight(54),
    height: calcHeight(54),
    borderRadius: calcWidth(20),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: calcWidth(16),
  },
  numbers: {
    height: calcHeight(28),
    width: calcWidth(47),
    backgroundColor: "#101C3B",
    borderRadius: calcWidth(20),
    alignItems: "center",
    justifyContent: "center",
  },
  activeNumbers: {
    height: calcHeight(28),
    width: calcWidth(47),
    backgroundColor: "white",
    borderRadius: calcWidth(20),
    alignItems: "center",
    justifyContent: "center",
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
    height: calcHeight(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: calcWidth(35),
    paddingRight: calcWidth(30),
    marginTop: calcHeight(10),
  },
  number: {
    color: "white",
    fontSize: calcFontSize(14),
    fontWeight: "500",
  },
  activenumber: {
    color: "#8B95AF",
    fontSize: calcFontSize(14),
    fontWeight: "500",
  },
  btnPlay: {
    width: calcWidth(85),
    height: calcWidth(85),
    backgroundColor: "#101C3B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    marginHorizontal: calcWidth(28),
  },
  btnrecord: {
    width: calcWidth(68),
    height: calcWidth(68),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
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
    height:'100%',
  },
  box: {
    width: 50,
    height: 50,
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  commandButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#292929",
    alignItems: "center",
    margin: 7,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#2c2c2fAA",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  //   header: {
  //     width: '100%',
  //     height: 50,
  //   },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#292929",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
