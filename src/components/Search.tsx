import React from 'react';
import {
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import { calcHeight, calcWidth } from "../assets/styles/dimensions"
import { createFilter } from 'react-native-search-filter';
import { debounce } from "lodash";

interface Props {
  renderSearchData(type: any): void;
  value: string
}
interface IState {
  searchTerm: any
}
class Search extends React.Component<Props, IState> {
  delayedCallback: any
  onChangeTextDelayed =debounce(this.onChangeText, 5000);
  constructor(props: Props) {
    
    super(props)
    
    this.state = {
      searchTerm: ''
    }
    
  }

  onChangeText(text:string) {
    this.props.renderSearchData(text)
    console.log("debouncing",text);
  }
  searchUpdated(term: any) {
    this.setState({ searchTerm: term })
  }
 
 
  render() {
    return (

      <View style={styles.search}>
        <View
          style={{
            borderBottomWidth: calcHeight(2),
            borderColor: '#57678F',
            width: '100%',
            flexDirection: 'row'
          }}>

          <TextInput
            onChangeText={(term) => {
              this.onChangeText(term)
              // this.searchUpdated(term)
              // 
            }}
            style={styles.searchInput}
            placeholderTextColor='white'
            placeholder="Поиск"
            value={this.props.value}
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
    width: '100%',
    // backgroundColor: '#0F1E45',
    // / height: calcHeight(65),
    alignItems: 'center',
   // paddingRight: calcWidth(8),
    // marginTop:calcHeight(10),
    justifyContent: 'center',
    flexDirection: 'row'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    width:'100%'
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    color: 'white',
    width:'100%'
  }

});