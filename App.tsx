import React from 'react';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen'
import { StyleSheet, Text, View } from 'react-native';
import MyApp from "./src/app"
import { storeData, getData } from "./src/utils/local_storage"
import store from './src/store';
import { Provider } from "react-redux"
import { connect } from "react-redux"
import {changeswipeablePanelActive} from "./src/store/actions/filterAction"
import Navigator from "./src/navigation/Navigator"
interface Props{
  onchangeswipeablePanelActive(payload:boolean):void;

}
enableScreens();
class App extends React.Component<Props, any> {
  constructor(props: Props) {

    super(props)
    this.state = {
      
    }
   
}
  componentDidMount() {
    SplashScreen.hide()
    getData("menuView").then((menuView) => {
      if (menuView == null) {
        storeData("menuView", true)
      }
    })
    getData("favorites").then((favorites) => {
      if (favorites == null) {
        storeData("favorites", [])
      }
    })
    getData("isLooking").then((favorites) => {
      if (favorites == null) {
        storeData("isLooking", [])
      }
    })
  }
  render() {
    return (
      <Provider store={store}>
       {/* <Navigator/> */}
   <MyApp/>
      </Provider>
    );
  }

};

export default App;

