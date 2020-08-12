import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

//import Video from 'react-native-video';

export default class Player extends  React.Component<any, any>  {
  constructor(props:any) {
    super(props);

    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }


 



  render() {


    return (
      <View style={styles.container}>
        
        
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
