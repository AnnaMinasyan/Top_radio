import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Heart from "../assets/icons/heart.svg"
import SimpleImage from "./SimpleImage"
import RedHeart from "../assets/icons/redHeart.svg"
import global_styles from "../assets/styles/global_styles"
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
}
  render() {

    return (
      <View style={[styles.body,
      { backgroundColor:this.props.backColor,
        borderBottomColor:this.props.backColor=="white"?'#F3F4F5':'#1E2B4D',
      }]}>
      <View style={styles.row}>
      
      <SimpleImage size={54} image={this.props.image}/>
    
    <Text
    numberOfLines={1}
     style={[global_styles.txtTitle,{color:this.props.backColor=="white"?"#1E2B4D":"white", marginRight:20,}]}>
      {this.props.title}</Text>
      </View>
          {this.props.showFavoriteHeart &&
           <TouchableOpacity
           onPress={()=>{
              this.add()
           }}
           style={{ height:50,width:70,justifyContent:'center', alignItems:'center',}}
           >
           {this.props.isFavorite?
    
    <RedHeart fill='#FF5050' height={19} width={21}/>: <Heart fill='#B3BACE'  height={18.54} width={20.83}/>} 
           </TouchableOpacity>
          }
      </View>
    );
  }
};

export default RadioMenuElement;
const styles = StyleSheet.create({
  body: {
  
   height:74,

   borderBottomWidth:1,
   flexDirection:'row',
   alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:25
    //paddingLeft:calcWidth(29),
   
  },
  
  row:{
      flexDirection:'row',
     // justifyContent:'space-between',
      width:'55%',
      alignItems:'center'
  },
  
  
});