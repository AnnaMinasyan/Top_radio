import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import HomeNavigator from "./HomeNavigator"
import MenuDrawerContent from './MenuDrawerContent';

interface Props {}

const styles = StyleSheet.create({
  container: {
    width: '89%',
  },
});

const Drawer = createDrawerNavigator();

const FilterDrawer: React.FunctionComponent<Props> = () => (
  <Drawer.Navigator
  
   initialRouteName="Home"
   drawerContent={(props) => <MenuDrawerContent {...props} />}
   >
  <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />
 
</Drawer.Navigator>
);

export default FilterDrawer;
