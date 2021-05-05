import React from 'react';
import { enableScreens } from 'react-native-screens';
import { 
   SafeAreaView, 
  StatusBar 
} from 'react-native';
import MyApp from "./src/app"
import store from './src/store';
import { Provider } from "react-redux"
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

