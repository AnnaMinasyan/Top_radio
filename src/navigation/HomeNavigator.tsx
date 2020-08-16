import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BaseHeader from "../components/BaseHeader"
import Menu from "../screens/Menu" 
import Cities from "../screens/Cities"
import Genres from "../screens/Genres"
import PlayList from "../screens/PlayList"
import MyAlarmClock from "../screens/MyAlarmClock"
import FilterMenu from "../screens/FilterMenu"
import Settings from "../screens/Settings"
const Stack = createStackNavigator();
const HomeNavigator: React.FunctionComponent = () => (
  <Stack.Navigator initialRouteName="Menu">
  
    <Stack.Screen
      name="Menu"
      component={Menu}
       options={{ header: BaseHeader, headerTransparent: true, }}
    />
    <Stack.Screen
    name="Cities"
    component={Cities}
     options={{ header: BaseHeader, headerTransparent: true, }}
    /> 
    <Stack.Screen
    name="Genres"
    component={Genres}
     options={{ header: BaseHeader, headerTransparent: true, }}
    />
    <Stack.Screen
    name="MyAlarmClock"
    component={MyAlarmClock}
    options={{headerShown:false}}
    />
    <Stack.Screen
    name="Settings"
    component={Settings}
    options={{headerShown:false}}
    />
     <Stack.Screen
    name="PlayList"
    component={PlayList}
    options={{headerShown:false}}
    />
    <Stack.Screen
    name="FilterMenu"
    component={FilterMenu}
    options={{ header: BaseHeader, headerTransparent: true, }}
    />
  </Stack.Navigator>
);
export default HomeNavigator;
