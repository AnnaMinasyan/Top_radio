import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import SearchSvg from "../assets/icons/search.svg"
import MenuSvg from "../assets/icons/menu_icon.svg"
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions"
interface Props {

}
interface IState { }
class Search extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {

    }

  }

  render() {
    return (

      <View style={styles.search}>
        <View style={{borderBottomWidth:calcHeight(2),borderColor:'#57678F',width:'100%', paddingBottom:calcHeight(13),paddingHorizontal:calcWidth(3)}}>
        <SearchSvg width={calcWidth(14.48)} height={calcHeight(15)}/>
        </View>
      </View>

    );
  }
};

export default Search;
const styles = StyleSheet.create({
    search: {
    backgroundColor: '#0F1E45',
    height: calcHeight(65),
    alignItems:'center',
    paddingHorizontal:calcWidth(21),
    justifyContent:'center'
  },
  
});