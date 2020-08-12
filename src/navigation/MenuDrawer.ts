import { createDrawerNavigator } from 'react-navigation-drawer';
import {createStackNavigator } from 'react-navigation-stack'
import CustomDrawerContentComponent from './MenuDrawerContent'
import Menu from "../screens/Menu"
import Header from "../components/Header"
import { createAppContainer } from 'react-navigation';
console.log("ewlaru vnipowehr tobiath");

const drawerScreens = createDrawerNavigator({
 
  Menu:Menu

}, 
{
  navigationOptions:{
    contentComponent: CustomDrawerContentComponent,
  },

})
const NavigationDrawer = createStackNavigator({
  drawer: {
    screen: drawerScreens,
  },

}, {

});




const MenuDrawer = createAppContainer(NavigationDrawer);

export default MenuDrawer; 



