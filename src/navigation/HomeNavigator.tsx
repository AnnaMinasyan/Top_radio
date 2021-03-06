import React, {useEffect,useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BaseHeader from "../components/BaseHeader"
import Menu from "../screens/RadiosList" 
import Cities from "../screens/Cities"
import Genres from "../screens/Genres"
import PlayList from "../screens/PlayList"
import MyAlarmClock from "../screens/MyAlarmClock"
import FilterMenu from "../screens/FilterMenu"
import Settings from "../screens/Settings"
import Favorite from "../screens/Favorite"
import navigationService from "./NavigationService";
import {NavigationContainer} from "@react-navigation/native";
const Stack = createStackNavigator();

const HomeNavigator: React.FunctionComponent = () => (

  <Stack.Navigator

  initialRouteName='Menu'>
  
    <Stack.Screen
      name="Menu"
      component={Menu}
       options={{headerShown:false,  headerTransparent: false, animationEnabled:false}}
    />
    <Stack.Screen
    name="Cities"
    component={Cities}
    options={{headerShown:false,  headerTransparent: false, animationEnabled:false}}
    /> 
    <Stack.Screen
    name="Genres"
    component={Genres}
    options={{headerShown:false,  headerTransparent: false, animationEnabled:false}}
    /> 
    <Stack.Screen
    name="Favorite"
    component={Favorite}
     options={{ headerShown:false, headerTransparent: true, animationEnabled:false}}
    />
    <Stack.Screen
    name="MyAlarmClock"
    component={MyAlarmClock}
    options={{headerShown:false,animationEnabled:false}}
    />
    <Stack.Screen
    name="Settings"
    component={Settings}
    options={{headerShown:false,animationEnabled:false}}
    />
     <Stack.Screen
    name="PlayList"
    component={PlayList}
    options={{headerShown:false,animationEnabled:false}}
    />
    <Stack.Screen
    name="FilterMenu"
    component={FilterMenu}
    options={{ headerShown:false, headerTransparent: true, animationEnabled:false}}
    />
  </Stack.Navigator>
);
export default HomeNavigator;
