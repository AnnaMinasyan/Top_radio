import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Menu from "../assets/icons/menu.svg"
import Logo from "../assets/icons/logo.svg"
import Menu2 from "../assets/icons/menu_2.svg"
import MenuDots from "../assets/icons/menu_dots.svg"
import Heart from "../assets/icons/heart.svg"
import SimpleImage from "./SimpleImage"
import RedHeart from "../assets/icons/redHeart.svg"
//import MenuSvg from "../assets/icons/menu_icon.svg"
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions"
import {IRadioMenuElementProps} from "../Interface"
interface IState {
    isFavorite:boolean
 }
class RadioMenuElement extends React.Component<IRadioMenuElementProps, IState> {
  constructor(props: IRadioMenuElementProps) {
    super(props)
    this.state = {
        isFavorite:this.props.isFavorite
    }

  }
add(){
  this.props.addInFavorite()
  //this.setState({isFavorite:!this.props.isFavorite})
}
  render() {
  
    return (
      <View style={[styles.body,{ backgroundColor:this.props.backColor,}]}>
      <View style={styles.row}>
      <SimpleImage size={calcHeight(54)} image={this.props.image}/>
    
    <Text style={[global_styles.txtTitle,{color:this.props.backColor=="white"?"#1E2B4D":"white"}]}>{this.props.title}</Text>
      </View>
           <TouchableOpacity
           onPress={()=>{
              this.add()
           }}
           style={{ height:calcHeight(50),width:calcWidth(70),justifyContent:'center', alignItems:'center'}}
           >
           {this.props.isFavorite?
    
    <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)}/>: <Heart fill='#B3BACE'  height={calcHeight(18.54)} width={calcWidth(20.83)}/>} 
           </TouchableOpacity>
     
      </View>
    );
  }
};

export default RadioMenuElement;
const styles = StyleSheet.create({
  body: {
  
   height:calcHeight(74),
   borderBottomColor:'#F3F4F5',
   borderBottomWidth:calcHeight(1),
   flexDirection:'row',
   alignItems:'center',
    justifyContent:'space-between',
    //paddingLeft:calcWidth(29),
   
  },
  
  row:{
      flexDirection:'row',
     // justifyContent:'space-between',
      width:'55%',
      alignItems:'center'
  },
  
  
});