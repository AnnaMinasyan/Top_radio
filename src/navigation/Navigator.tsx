import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuDrawerContent from "./MenuDrawerContent";
import HomeNavigator from "./HomeNavigator";
import navigationService from "./NavigationService";
import Menu from "../screens/RadiosList";
import Cities from "../screens/Cities";
import Genres from "../screens/Genres";
import Favorite from "../screens/Favorite";
import MyAlarmClock from "../screens/MyAlarmClock";
import Settings from "../screens/Settings";
import PlayList from "../screens/PlayList";
import FilterMenu from "../screens/FilterMenu";
const Drawer = createDrawerNavigator();
import LookingMenu from "../screens/lookingMenu"
const Navigator: React.FunctionComponent = (props:any) => (

  <NavigationContainer
  >
      <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <MenuDrawerContent {...props} />}
      >
          <Drawer.Screen
              name="Menu"
              component={Menu}
          />
          <Drawer.Screen
              name="Cities"
              component={Cities}
          />
          <Drawer.Screen
              name="Genres"
              component={Genres}
          />
          <Drawer.Screen
              name="Favorite"
              component={Favorite}
          />
          <Drawer.Screen
              name="MyAlarmClock"
              component={MyAlarmClock}
          />
          <Drawer.Screen
              name="Settings"
              component={Settings}

          />
          <Drawer.Screen
              name="PlayList"
              component={PlayList}

          />
          <Drawer.Screen
              name="FilterMenu"
              component={FilterMenu}
          />
          <Drawer.Screen name="LookingMenu" component={LookingMenu} />

      </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigator;
