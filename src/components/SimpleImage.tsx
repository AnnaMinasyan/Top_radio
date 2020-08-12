import React from 'react';
import {
  View,
  StyleSheet,
  Text,
   Image
} from 'react-native';
interface Props {
size:number
title?:string,
color?:string,
image?:any
}
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions"

interface IState { }
class SimpleImage extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {

    }

  }

  render() {
   
    // console.log('https://top-radio.com.ua/assets/image/radio/'+this.props.image);
    
    return (

   
     <View>
      { this.props.color && this.props.title?
      <View style={[styles.header,{height:this.props.size, width:this.props.size, backgroundColor:this.props.color}]}>
       <Text style={styles.letter}>{this.props.title.charAt(0)}</Text>
      </View>
        :<View style={[styles.header,{height:this.props.size, width:this.props.size, padding:2}]}>
          <Image style={[{height:this.props.size, width:this.props.size, backgroundColor:this.props.color,borderRadius:8}]} source={{uri:'https://top-radio.com.ua/assets/image/radio/'+this.props.image}}/>
        </View>}
     </View>
    );
  }
};

export default SimpleImage;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
   borderRadius:8,
   shadowOffset: {
	width: 0,
	height: 2,
},
shadowColor:'rgba(0, 0, 0, 0.1)',
shadowOpacity: 0.25,
shadowRadius: 16,

elevation: 5,
justifyContent:'center',
alignItems:'center'
  },
  letter:{
    color:'#FFFFFF',
    fontSize:calcFontSize(24),
    fontWeight:'bold'
  }
 
});