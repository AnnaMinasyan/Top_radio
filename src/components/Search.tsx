import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,TouchableOpacity,
  TextInput
} from 'react-native';
import SearchSvg from "../assets/icons/search.svg"
import MenuSvg from "../assets/icons/menu_icon.svg"
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions"
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['pa'];

interface Props {
  renderSearchData(type:any):void;
}
interface IState {
  searchTerm:any
 }
class Search extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      searchTerm: ''
    }

  }
  searchUpdated(term:any) {
    this.setState({ searchTerm: term })
  }

  render() {

    return (

      <View style={styles.search}>
        <View 
        style={{borderBottomWidth:calcHeight(2),
        borderColor:'#57678F',
        width:'100%',
        // paddingBottom:calcHeight(13),
         paddingHorizontal:calcWidth(3),
         flexDirection:'row'}}>
        {/* <SearchSvg width={calcWidth(14.48)} height={calcHeight(15)} style={{marginTop:calcHeight(20), marginRight:calcWidth(13.26)}}/> */}
        <TextInput 
          onChangeText={(term) => { this.searchUpdated(term),
             this.props.renderSearchData(term) }} 
          style={styles.searchInput}
         placeholderTextColor='white'
         placeholder="Поиск"
         autoFocus={true}
          />
        </View>
      </View>

    );
  }
};

export default Search;
const styles = StyleSheet.create({
    search: {
      width:'100%',
      backgroundColor: '#0F1E45',
    // / height: calcHeight(65),
    alignItems:'center',
    paddingHorizontal:calcWidth(21),
    // marginTop:calcHeight(10),
    justifyContent:'center',
    flexDirection:'row'
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    color:'white',
    
  }
  
});