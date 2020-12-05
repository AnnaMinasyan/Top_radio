import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuDrawerContent from "./MenuDrawerContent";
import HomeNavigator from "./HomeNavigator";
import navigationService from "./NavigationService";
const Drawer = createDrawerNavigator();

const Navigator: React.FunctionComponent = (props:any) => (

  <NavigationContainer
      ref={navigatorRef => navigationService.setNavigator(navigatorRef)}
  >
      <Drawer.Navigator

          initialRouteName="Home"
          drawerContent={(props) => <MenuDrawerContent {...props} />}
      >
          <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />

      </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigator;
