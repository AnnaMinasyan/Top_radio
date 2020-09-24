import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
interface Props{
    swiper
}
export default class swiper  extends React.Component<Props, any> {
  constructor (props:Props) {
    super(props)
    swiperRef = (swiper:any) => this.swiper = swiper
    this.scrollHandler = page => {
      console.log ('Page ',page,this.swiper)
      this.swiper && this.swiper.scrollBy(page, true)
    }
  }
  render (){
    return (
      <Swiper
        ref={ this.swiperRef }
        showsButtons={false}
        width={500}
        height={500}
        showsPagination={false}
        index={0}
        loop={true} >
        <View style={ styles.slide1 }>
            <Text style={ styles.text } onPress={()=>{console.log('Page 0'); this.swiper.scrollBy(1, true)}}>One</Text>
        </View>
        <View style={ styles.slide2 }>
             <Text style={ styles.text } onPress={()=>{console.log('Page 1'); this.swiper.scrollBy(1, true)}}>Two</Text>
        </View>
        <View style={ styles.slide3 } >
            <Text style={ styles.text } onPress={()=>{console.log('Page 2');this.swiper.scrollBy(2, true)}}>Three</Text>
        </View>
    </Swiper>
    )
  }
}


AppRegistry.registerComponent('myproject', () => swiper);