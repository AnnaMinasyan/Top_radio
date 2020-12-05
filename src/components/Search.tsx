import React from 'react';
import {
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import {calcHeight,calcWidth} from "../assets/styles/dimensions"
import { createFilter } from 'react-native-search-filter';

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
         flexDirection:'row'}}>

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
     // backgroundColor: '#0F1E45',
    // / height: calcHeight(65),
    alignItems:'center',
    paddingRight:calcWidth(21),
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