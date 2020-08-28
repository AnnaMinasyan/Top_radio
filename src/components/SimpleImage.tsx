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
    if (this.props.size == calcHeight(98) || this.props.size == calcHeight(257)) {
      count = 180
    }
    
    return (
      <View style={[styles.header,{
        height: this.props.size,
        width: this.props.size,
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.25,


    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    color: '#FFFFFF',
    fontSize: calcFontSize(24),
    fontWeight: 'bold'
  }

});