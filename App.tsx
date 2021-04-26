import React from 'react';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen'
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import MyApp from "./src/app"
import { storeData, getData } from "./src/utils/local_storage"
import store from './src/store';
import { Provider } from "react-redux"
import { Platform } from 'react-native';
import Page from "./src/screens/recording"
import Navigator from "./src/navigation/Navigator"
import { NavigationContainer } from '@react-navigation/native';
interface Props {


}
enableScreens();
class App extends React.Component<Props, any> {
  constructor(props: Props) {

    super(props)
    this.state = {
      
    }

  }
 
  render() {
    return (

      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#0F1E45" />
            <MyApp />
        </SafeAreaView>
      </Provider>
    );
  }

};

export default App;

