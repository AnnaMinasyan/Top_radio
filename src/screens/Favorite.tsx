import React from "react";
import { View, StyleSheet, TouchableHighlight, FlatList } from "react-native";
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceHeight,
} from "../assets/styles/dimensions";
import Header from "../components/Header";
import { IMenuProps } from "../Interface";
import {
  changeplayItem,
  changePlayingData,
  changeMiniScreenData,
  changeSelectedRadioStation,
} from "../store/actions/bottomAction";
import {
  getFavorites,
  changeSearchData,
  changePlayingMusic,
} from "../store/actions/filterAction";
import RadioMenuElement from "../components/RadioMenuElement";
import { storeData, getData } from "../utils/local_storage";
import SimpleImage from "../components/SimpleImage";
import { connect } from "react-redux";
import { createFilter } from "react-native-search-filter";
import { addFavorites, deleteIsFavorite } from "../store/actions/favoritesActions";
import player from "../services/player/PlayerServices";
import Bottom from "../components/Bottom";
import { changeFilterData, setFilterData } from "../store/actions/menuActions";
import { changeSwiperListType } from "../store/actions/playlistAction";
const KEYS_TO_FILTERS = ["pa"];
interface IState {
  favoriteList: [];
  playItem: [];
  activBi: number;
  playUrl: string;
  searchvalue: string;
}

class Favorite extends React.Component<IMenuProps, IState> {
  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      favoriteList: [],
      playItem: [],
      activBi: 0,
      playUrl: "",
      searchvalue: "",
    };
    const unsubscribe = props.navigation.addListener("focus", () => {
      this.setData();
    });
  }
  setData() {
    getData("favorites").then((favorite) => {
      this.setState({ favoriteList: favorite });
      this.props.onsetFilterData(favorite);
    });
    this.setState({ searchvalue: "" });
  }
  checkIsFovorite(num: number) {
    return this.props.favorites.includes(num);
  }
  _addLookingList(data: any) {
    getData("isLooking").then((lookList) => {
      let count = true;
      if (lookList && lookList.length > 0) {
        for (let index = 0; index < lookList.length; index++) {
          const element = lookList[index];
          if (element.id == data.id) {
            lookList.splice(index, 1);
          }
        }
        if (count) {
          lookList.push(data);
        }
      }
      storeData("isLooking", lookList);
    });
  }
  renderMenuItems(data: any) {
    if (data.item.id && this.checkIsFovorite(data.item.id)) {
      return (
        <TouchableHighlight
          onPress={() => {
            this._addLookingList(data.item);
            let radioStation = {
              data: data.item,
              isPlayingMusic: false,
              activeBi: data.item.st[0],
              id: data.item.id,
              index: data.index,
            };
            let info = {
              radioStation: radioStation,
              index: data.index,
              isPlayingMusic: this.props.bottomReducer.selectedRadioStation
                ?.isPlayingMusic,
            };
            this.props.onchangeSwiperListType('filter')
            player.open(info);
          }}
        >
          <RadioMenuElement
            showFavoriteHeart={true}
            title={data.item.pa}
            image={data.item.im}
            backColor={this.props.theme.backgroundColor}
            addInFavorite={() => this.props.ondeleteIsFavorite(data.item)}
            id={data.item.id}
          />
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }
  renderMenuItemsMenuStyle2(data: any) {
    if (data.item.id && this.checkIsFovorite(data.item.id)) {
      return (
        <TouchableHighlight
          onPress={() => {
            this._addLookingList(data.item);
            let radioStation = {
              data: data.item,
              isPlayingMusic: false,
              activeBi: data.item.st[0],
              id: data.item.id,
              index: data.index,
            };
            let info = {
              radioStation: radioStation,
              index: data.index,
              isPlayingMusic: this.props.bottomReducer.selectedRadioStation
                ?.isPlayingMusic,
            };
            player.open(info);
            this.props.onchangeSwiperListType('filter')

          }}
          style={{ padding: calcWidth(8) }}
        >
          <SimpleImage size={100} image={data.item.im} />
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }
  _changeSearchData(text: string) {
    this.setState({ searchvalue: text });
    let data = this.props.menuReducer.favoriteList;
    this.setState({
      favoriteList: data.filter((i: any) =>
        i.pa.toLowerCase().includes(text.toLowerCase())
      ),
    });
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.theme.backgroundColor },
        ]}
      >
        <Header
          navigation={this.props.navigation}
          onchnageSearchData={this.props.onchnageSearchData}
          changeSearchData={(text) => {
            this._changeSearchData(text);
          }}
          clearSearchData={() => {
            this._changeSearchData("");
          }}
          searchvalue={this.state.searchvalue}
        />
        {this.state.favoriteList && this.props.filterReducer.menuType == 1 ? (
          <FlatList
            key={'_'}

            data={this.state.favoriteList}
            renderItem={(d) => this.renderMenuItems(d)}
            keyExtractor={(item: any, index: number) => item.id?.toString()}
            maxToRenderPerBatch={10}
          />
        ) : (
          <FlatList
            key={'#'}
            data={this.state.favoriteList}
            renderItem={(d) => this.renderMenuItemsMenuStyle2(d)}
            contentContainerStyle={{
               width: "100%",
                justifyContent: 'center',
                paddingBottom: this.props.bottomReducer.swiperShowRadiostation ? 95 : 20,
                flexDirection: 'row',
                flexWrap: 'wrap'
            
            }}
            keyExtractor={(item: any, index: number) => item.id?.toString()}
            maxToRenderPerBatch={10}
            numColumns={this.props.theme.albomeMode?5:3}

          />
        )}
      </View>
    );
  }
}
const mapStateToProps = ({
  filterReducer,
  menuReducer,
  favorites,
  theme,
  bottomReducer,
}: any) => {
  return { filterReducer, menuReducer, favorites, theme, bottomReducer };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
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
    onchangePlayingData: (payload: any) => {
      dispatch(changePlayingData(payload));
    },
    onchangeSelectedRadioStation: (payload: any) => {
      dispatch(changeSelectedRadioStation(payload));
    },
    onchangeMiniScreenData: (payload: any) => {
      dispatch(changeMiniScreenData(payload));
    },
    onsetFilterData: (payload: any) => {
      dispatch(changeFilterData(payload));
    },
    ondeleteIsFavorite: (payload: any) => {
      dispatch(deleteIsFavorite(payload));
    },
    onchangeSwiperListType: (payload: any) => {
      dispatch(changeSwiperListType(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0F1E45",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
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
    height: deviceHeight,
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
