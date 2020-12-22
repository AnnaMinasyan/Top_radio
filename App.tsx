import React from 'react';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen'
import { StyleSheet, Text, View } from 'react-native';
import MyApp from "./src/app"
import { storeData, getData } from "./src/utils/local_storage"
import store from './src/store';
import { Provider } from "react-redux"
import Bugsee from 'react-native-bugsee';
import {Platform} from 'react-native';
import Page from "./src/screens/recording"
import Navigator from "./src/navigation/Navigator"
interface Props{


}
enableScreens();
class App extends React.Component<Props, any> {
  constructor(props: Props) {

    super(props)
    this.state = {
      
    }
    this.launchBugsee();

}
  componentDidMount() {
    SplashScreen.hide()
   
    // getData("favorites").then((favorites) => {
    //   if (favorites == null) {
    //     storeData("favorites", [])
    //   }
    // })
    getData("isLooking").then((favorites) => {
      if (favorites == null) {
        storeData("isLooking", [])
      }
    })
    getData('alarmClock').then((time)=>{
      if(time){
      }
      })
  }
  async launchBugsee() {
    let appToken;

    if (Platform.OS === 'ios') {
        appToken = '<IOS-APP-TOKEN>';
    } else {
        appToken = '<ANDROID-APP-TOKEN>';
    }

    await Bugsee.launch(appToken);
  }
  render() {
    return (
      <Provider  store={store}>
       {/* <Navigator/> */}
       {/*<Page/>*/}
   <MyApp/>
      </Provider>
    );
  }

};

export default App;

