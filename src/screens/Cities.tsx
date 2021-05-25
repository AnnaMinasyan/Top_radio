import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import { ICitiesProps } from "../Interface";
import {
  changeFilterData,
  changeHeaderText,
} from "../store/actions/menuActions";
import { changeFilterCities, getCitiesData } from "../store/actions/citiesAction";
import { changeSearchData } from "../store/actions/filterAction";
import CitiesMenuElement from "../components/CitiesMenuElement";
import { connect } from "react-redux";
import { createFilter } from "react-native-search-filter";
import { deviceWidth } from "../assets/styles/dimensions";
const KEYS_TO_FILTERS = ["pa"];
interface IState {
  colors: string[];
  loading: boolean;
  searchvalue: string ;

}
class Cities extends React.Component<ICitiesProps, IState> {
  constructor(props: ICitiesProps) {
    super(props);
    this.state = {
      colors: ["#4F67A6", "#41A1BF", "#42B39E", "#49BE7F", "#7C59C5"],
      loading: false,
      searchvalue:''
    };
    const unsubscribe = props.navigation.addListener("focus", () => {
      this.setData() 
    });
  }
  componentDidMount() {
    this.props.onGetCities();
  }
  setData() {
    this.setState({ searchvalue: "" });
    this.setState({ loading: false });
  }
  filterData(res: any) {
    const array: any = [];

    for (
      let index = 0;
      index < this.props.menuReducer.menuData.length;
      index++
    ) {
      const element = this.props.menuReducer.menuData[index];
      if (element.ci && element.ci.length > 0) {
        element.ci.map((elem: any, key: any) => {
          if (elem == res.id) {
            array.push(element);
          }
        });
      }
    }

    this.props.onchangeFilterData(array);
  }
  renderMenuItems(data: any) {
    return (
      <CitiesMenuElement
        info={data.item}
        backColor={this.props.theme.backgroundColor}
        onSelect={() => {
          this.setState({ loading: true });
          this.filterData(data.item);
          this.props.navigation.navigate("FilterMenu");
          this.props.onchangeHeaderText(data.item.pa);
       
        }}
      />
    );
  }
  _changeSearchData(text: string) {
   
      this.setState({ searchvalue: text });
      let data = this.props.citiesReducer.cities;
      data.filter((i: any) => i.pa.toLowerCase().includes(text.toLowerCase()));
      this.props.onchangeFilterCities(
        data.filter((i: any) => i.pa.toLowerCase().includes(text.toLowerCase()))
      );
    
  }
  render() {
    const list =
      this.props.citiesReducer.filterCities != null
        ? this.props.citiesReducer.cities.filter(
            createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS)
          )
        : [];

    return (
      <View style={{ backgroundColor: this.props.theme.backgroundColor }}>
        <Header
          changeSearchData={(text) => {
            this._changeSearchData(text);
          }}
          clearSearchData={()=>{ this.setState({ searchvalue: '' });}}
          searchvalue={this.state.searchvalue}
          navigation={this.props.navigation}
          title={"Города"}
          onchnageSearchData={this.props.onchnageSearchData}
        />
        {this.state.loading && (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        )}
        {this.props.citiesReducer.cities ? (
          <FlatList
            numColumns={1}
            data={  this.props.citiesReducer.filterCities}
            renderItem={(d) => this.renderMenuItems(d)}
            keyExtractor={(item: any, index: number) => item.id.toString()}
            maxToRenderPerBatch={10}
          />
        ): (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
              height: "100%",
              backgroundColor: this.props.theme.backgroundColor,
            }}
          >
            <ActivityIndicator size="large" color="#0F1E45" />
          </View>
        ) }
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return state;
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetCities: () => {
      dispatch(getCitiesData());
    },
    onchangeFilterData: (payload: any) => {
      dispatch(changeFilterData(payload));
    },
    onchnageSearchData: (payload: any) => {
      dispatch(changeSearchData(payload));
    },
    onchangeHeaderText: (payload: string) => {
      dispatch(changeHeaderText(payload));
    },
    onchangeFilterCities: (payload: string) => {
      dispatch(changeFilterCities(payload));
    },
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);

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
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    height: "110%",
    position: "absolute",
    zIndex: 1,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
  },
});
