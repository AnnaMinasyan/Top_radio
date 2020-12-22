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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import  BottomSwiper from "../components/BottomSwiper"
const Tab = createBottomTabNavigator();
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const BottomTabStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="Menu"
            tabBar={(props) => <BottomSwiper {...props} />}
            >
            <Tab.Screen
                name="BottomSwiper"
                component={BottomSwiper}
                options={{
                    tabBarLabel: 'Home Screen',
                    /*tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={size}
                      />
                    ),*/
                }}
            />
            <Tab.Screen name="Menu" component={Menu}/>
            <Tab.Screen name="Favorite"  component={Favorite}/>
            <Tab.Screen name="Genres" component={Genres}/>
            <Tab.Screen name="Cities" component={Cities}/>
            <Tab.Screen name="FilterMenu" component={FilterMenu}/>
            <Tab.Screen name="PlayList" component={PlayList}/>
            <Tab.Screen name="LookingMenu" component={LookingMenu}/>
        </Tab.Navigator>
    );
};
const SettingScreenStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName="Cities"
            >
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                    title: 'Menu', //Set Header Title
                }}
            />
            <Stack.Screen
                name="Cities"
                component={Cities}
                options={{
                    title: 'Cities', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};
const Navigator: React.FunctionComponent = (props:any) => (


      <Drawer.Navigator
          initialRouteName="BottomTabStack"
          drawerContent={(props) => <MenuDrawerContent {...props} />}
      >
          <Drawer.Screen
              name="BottomTabStack"
           //   options={{drawerLabel: 'Home Screen Option'}}
              component={BottomTabStack}
          />

          <Drawer.Screen
              name="Menu"
              component={Menu}
          />
          <Drawer.Screen
              name="Settings"
              component={Settings}
          />
          <Drawer.Screen
              name="MyAlarmClock"
              component={MyAlarmClock}
          />

      </Drawer.Navigator>

);

export default Navigator;
