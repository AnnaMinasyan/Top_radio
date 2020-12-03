import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
interface Props {
  size: number
  title?: string,
  color?: string,
  image?: any
}
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import keys from "../services/keys";

interface IState { }
class SimpleImage extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }
  render() {

    let count = 100
    if (this.props.size == 98 || this.props.size == 180) {
      count = 180
    }
   // console.log(":::::",'https://top-radio.ru/assets/image/radio/' + count + '/' + this.props.image);
    
    return (
      <View style={[styles.header,{
        height: this.props.size,
        width: this.props.size,
        shadowColor:this.props.size==180? 'rgba(0, 0, 0, 0.04)':'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
      }]} >
        {this.props.color && this.props.title ?
          <View style={[styles.header, { height: this.props.size, width: this.props.size, backgroundColor: this.props.color }]}>
            <Text style={styles.letter}>{this.props.title.charAt(0)}</Text>
          </View>
          :
           <View style={[styles.header, { height: this.props.size, width: this.props.size,}]}>
          <Image
      style={[{
        height: this.props.size,
        width: this.props.size,
        borderRadius: 8,
      }]} 
        source={{
          uri:'https://top-radio.ru/assets/image/radio/' + count + '/' + this.props.image

        }}
      />
          </View>}
      </View>
    );
  }
};

export default SimpleImage;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
   shadowColor:'red',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.19,
    shadowRadius: 4.65,
    
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  }

});